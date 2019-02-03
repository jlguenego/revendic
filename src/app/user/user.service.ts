import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { FirebaseUtils } from './FirebaseUtils';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserRoutes } from './user-routes';
import { map } from 'rxjs/operators';
import { DialogService } from '../dialog/dialog.service';
import { ResponsiveService } from '../layout/responsive.service';

const LOCALSTORAGE_NEXT_URL = 'nextUrl';

export interface UserData {
  displayName: string;
  photoURL: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  routes = UserRoutes;

  public static ERROR = {
    MAIL_ALREADY_IN_USE: 'mail-already-in-use',
    WEAK_PASSWORD: 'weak-password',
    UNKNOWN: 'unknown',
    BAD_PASSWORD: 'bad password',
  };

  url = '/';

  isVerified = false;
  isLogged = undefined;
  displayName = "";
  photoURL = null;
  email = "";
  uid = "";
  provider = "";

  onDeletionPromiseList: (() => Promise<void>)[] = [];

  subject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private zone: NgZone,
    private responsive: ResponsiveService,
    private dialog: DialogService) {
    this.afAuth.user.pipe(map(user => this.sync(user))).subscribe(this.subject);
  }

  sync(user: firebase.User) {
    if (user) {
      this.manageJustVerifiedCase(user);
      this.isLogged = true;
      this.isVerified = user.emailVerified;
      this.displayName = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL;
      this.uid = user.uid;
      this.provider = user.providerData[0].providerId;
    } else {
      this.isLogged = false;
      this.isVerified = false;
      this.displayName = "";
      this.email = "";
      this.photoURL = null;
      this.uid = "";
      this.provider = "";
    }
    this.manageOauthRedirect();
    this.subject.next(true);
    return this.isLogged;
  }

  isConnected() {
    return new Promise((resolved, rejected) => {
      if (this.isLogged === undefined) {
        this.afAuth.authState.subscribe(user => {
          if (user) {
            resolved();
          } else {
            rejected();
          }
        });

      } else if (this.isLogged === true) {
        resolved();
      } else if (this.isLogged === false) {
        rejected();
      }
    });
  }

  checkAccountVerified() {
    return this.isConnected().catch(() => {
      this.dialog.show('needAccount');
      return Promise.reject();
    }).then(() => {
      if (!this.isVerified) {
        this.dialog.show('needVerified');
        return Promise.reject();
      }
    });
  }

  refresh() {
    const user = this.afAuth.auth.currentUser;
    if (user) {
      user.reload().finally(() => {
        this.sync(user);
      });
    } else {
      this.sync(user);
    }
  }

  navigateTo(path: string, data?: any) {
    return () => {
      return this.zone.run(() => {
        if (data) {
          this.router.navigate([path, data]);
        } else {
          this.router.navigate([path]);
        }
      });
    };
  };

  navigateToNextUrl() {
    return () => {
      return this.zone.run(() => {
        const url = this.url;
        this.url = '/';
        this.router.navigate([url]);
      });
    };
  }

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(this.navigateToNextUrl())
      .catch(error => {
        console.error('error', error);
        if (error.code === 'auth/wrong-password') {
          return Promise.reject(UserService.ERROR.BAD_PASSWORD);
        }
        if (error.code === 'auth/user-not-found') {
          return Promise.reject(UserService.ERROR.BAD_PASSWORD);
        }
        return Promise.reject(UserService.ERROR.UNKNOWN);
      });
  }

  loginWithGoogle() {
    if (this.responsive.mobile) {
      // use the local storage to store the redirect url
      window.localStorage.setItem(LOCALSTORAGE_NEXT_URL, this.url);
      return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    }
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(this.navigateToNextUrl());
  }

  loginWithFacebook() {
    if (this.responsive.mobile) {
      // use the local storage to store the redirect url
      window.localStorage.setItem(LOCALSTORAGE_NEXT_URL, this.url);
      return this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider());
    }
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(this.navigateToNextUrl())
      .catch(error => {
        return this.zone.run(() => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            return this.afAuth.auth.fetchSignInMethodsForEmail(error.email).then(() => {
              return this.zone.run(() => {
                const provider = new auth.GoogleAuthProvider();
                provider.setCustomParameters({ login_hint: error.email });
                return this.afAuth.auth.signInWithPopup(provider)
              });
            }).then(() => {
              this.afAuth.auth.currentUser.linkWithPopup(new auth.FacebookAuthProvider())
            })
              .then(this.navigateToNextUrl());
          }
          return Promise.reject();
        });
      });
  }

  manageOauthRedirect() {
    if (!this.responsive.mobile) {
      return;
    }
    // use the local storage to store the redirect url
    const url = window.localStorage.getItem(LOCALSTORAGE_NEXT_URL);
    if (!url) {
      return;
    }
    window.localStorage.removeItem(LOCALSTORAGE_NEXT_URL);

    if (!this.isLogged) {
      // facebook problem ?
      this.afAuth.auth.getRedirectResult().catch(async error => {
        console.log('error from signinwithredirect:', error);
        if (error.code === 'auth/account-exists-with-different-credential') {
          await this.afAuth.auth.fetchSignInMethodsForEmail(error.email);
          return this.zone.run(() => {
            const provider = new auth.GoogleAuthProvider();
            provider.setCustomParameters({ login_hint: error.email });
            window.localStorage.setItem(LOCALSTORAGE_NEXT_URL, url);
            return this.afAuth.auth.signInWithRedirect(provider);
          });
        }
      });
      return;
    }
    this.router.navigate([url]);
  }

  logout() {
    return this.afAuth.auth.signOut().then(this.navigateToNextUrl());
  }

  createAccount(obj: UserData) {
    return this.afAuth.auth.createUserWithEmailAndPassword(obj.email, obj.password)
      .then(() => {
        const user = this.afAuth.auth.currentUser;
        return user.updateProfile({ displayName: obj.displayName, photoURL: obj.photoURL });
      })
      .then(() => this.activate())
      .catch(error => {
        return this.zone.run(() => {
          console.error('error', error);
          if (error.code === 'auth/weak-password') {
            return Promise.reject(UserService.ERROR.WEAK_PASSWORD);
          }
          if (error.code === 'auth/email-already-in-use') {
            return Promise.reject(UserService.ERROR.MAIL_ALREADY_IN_USE);
          }
          return Promise.reject(error.code);
        });
      });
  }

  updateAccount(obj: UserData) {
    const user = this.afAuth.auth.currentUser;
    return user.updateProfile({ displayName: obj.displayName, photoURL: obj.photoURL })
      .then(this.navigateTo('/compte-mis-a-jour'))
      .catch(error => {
        return this.zone.run(() => {
          console.error('error', error);
          return Promise.reject(error.code);
        });
      });
  }

  sendForgottenPasswordEmail(email: string): any {
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => this.router.navigate(['/email-mot-de-passe-envoye', { email }]))
      .catch(() => this.router.navigate(['/email-mot-de-passe-envoye', { email: email + '..' }]));
  }

  delete() {
    const promises = this.onDeletionPromiseList.map(fn => fn());
    Promise.all(promises).then(() => {
      return this.afAuth.auth.currentUser.delete();
    }).then(() => this.router.navigate(['compte-efface'])
    ).catch(error => {
      const message = FirebaseUtils.getLocaleMessage(error);
      this.router.navigate(['erreur', { message }])
    });

  }

  updatePassword(password: string, newPassword: string) {
    Promise.resolve()
      .then(() => {
        if (this.isFromSocialLogin()) {
          const credential = auth.EmailAuthProvider.credential(this.email, newPassword);
          return this.afAuth.auth.currentUser.linkAndRetrieveDataWithCredential(credential).then(() => {
          });
        }
        return this.afAuth.auth.signInWithEmailAndPassword(this.email, password).then(() => {
          return this.afAuth.auth.currentUser.updatePassword(newPassword);
        })
      })
      .then(this.navigateTo('/mot-de-passe-change-avec-succes'))
      .catch(error => {
        console.error('error', error);
        const message = FirebaseUtils.getLocaleMessage(error);
        this.router.navigate(['erreur', { message }])
      });

  }

  activate() {
    const user = this.afAuth.auth.currentUser;
    user.sendEmailVerification();
    return this.navigateTo('/verifie-compte', { email: user.email })();
  }

  testURL(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  }

  isFromSocialLogin() {
    return this.afAuth.auth.currentUser.providerData.reduce((acc, provider) => {
      return acc && provider.providerId !== 'password';
    }, true);
  }

  manageJustVerifiedCase(user: firebase.User) {
    if (user.emailVerified === true && this.isVerified === false) {
      user.getIdToken(true);
    }
  }

}
