import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { FirebaseUtils } from './FirebaseUtils';
import { Subject, Observable, Observer } from 'rxjs';
import { UserPath } from './user-path';
import { promised } from 'q';

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

  path = UserPath.path;

  public static ERROR = {
    MAIL_ALREADY_IN_USE: 'mail-already-in-use',
    WEAK_PASSWORD: 'weak-password',
    UNKNOWN: 'unknown',
    BAD_PASSWORD: 'bad password',
  };

  isVerified = false;
  isLogged = undefined;
  displayName = "";
  photoURL = null;
  email = "";

  subject: Subject<boolean>;
  private observer: Observer<boolean>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private zone: NgZone) {
    const observable = Observable.create(observer => {
      this.observer = observer;
      this.afAuth.user.subscribe(user => {
        console.log('user', user);
        this.sync(user);
      });
    });
    this.subject = new Subject();
    observable.subscribe(this.subject);
  }

  sync(user) {
    if (user) {
      this.isLogged = true;
      this.isVerified = user.emailVerified;
      this.displayName = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL;
    } else {
      this.isLogged = false;
      this.isVerified = false;
      this.displayName = "";
      this.email = "";
      this.photoURL = null;
    }
    this.observer.next(true);
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
    console.log('navigate to', path);
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

  login(email: string, password: string, nextUrl = "/") {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(this.navigateTo(nextUrl))
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

  loginWithGoogle(nextUrl = "/") {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(this.navigateTo(nextUrl));
  }

  loginWithFacebook(nextUrl = "/") {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(this.navigateTo(nextUrl))
      .catch(error => {
        return this.zone.run(() => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            return this.afAuth.auth.fetchSignInMethodsForEmail(error.email).then(providers => {
              return this.zone.run(() => {
                console.log('providers', providers);
                const provider = new auth.GoogleAuthProvider();
                provider.setCustomParameters({ login_hint: error.email });
                return this.afAuth.auth.signInWithPopup(provider)
              });
            }).then(() => {
              this.afAuth.auth.currentUser.linkWithPopup(new auth.FacebookAuthProvider())
            })
              .then(this.navigateTo(nextUrl));
          }
          console.log('error', error);
          return Promise.reject();
        });
      });
  }

  logout(nextUrl = "") {
    return this.afAuth.auth.signOut().then(this.navigateTo(nextUrl));
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
      .catch(error => this.router.navigate(['/email-mot-de-passe-envoye', { email: email + '..' }]));
  }

  delete() {
    this.afAuth.auth.currentUser.delete()
      .then(() => this.router.navigate(['compte-efface']))
      .catch(error => {
        console.log('error', error);
        const message = FirebaseUtils.getLocaleMessage(error);
        this.router.navigate(['erreur', { message }])
      });
  }

  updatePassword(password: string, newPassword: string) {
    console.log('update password');
    Promise.resolve()
      .then(() => {
        if (this.isFromSocialLogin()) {
          const credential = auth.EmailAuthProvider.credential(this.email, newPassword);
          return this.afAuth.auth.currentUser.linkAndRetrieveDataWithCredential(credential).then(() => {
            console.log('user created password');
          });
        }
        return this.afAuth.auth.signInWithEmailAndPassword(this.email, password).then(() => {
          return this.afAuth.auth.currentUser.updatePassword(newPassword);
        })
      })
      .then(this.navigateTo('/mot-de-passe-change-avec-succes'))
      .catch(error => {
        console.log('error', error);
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
      return acc && provider.providerId === 'password';
    }, true);
  }

}
