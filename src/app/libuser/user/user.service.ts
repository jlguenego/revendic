import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { FirebaseUtils } from '../FirebaseUtils';
import { UserData } from './user.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public static ERROR = {
    MAIL_ALREADY_IN_USE: 'mail-already-in-use',
    WEAK_PASSWORD: 'weak-password',
    UNKNOWN: 'unknown',
    BAD_PASSWORD: 'bad password',
  };

  isVerified = false;
  isLogged = false;
  displayName = "";
  photoURL = null;
  email = "";
  providerId: string;

  constructor(private afAuth: AngularFireAuth, private router: Router, private zone: NgZone) {
    this.afAuth.user.subscribe(user => {
      console.log('user', user);
      this.sync(user);
    });
  }

  sync(user) {
    if (user) {
      this.isLogged = true;
      this.isVerified = user.emailVerified;
      this.displayName = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL;
      this.providerId = providerIdFormat(user.providerData[0].providerId);
    } else {
      this.isLogged = false;
      this.isVerified = false;
      this.displayName = "";
      this.email = "";
      this.photoURL = null;
      this.providerId = undefined;
    }
  }

  refresh() {
    const user = this.afAuth.auth.currentUser;
    if (user) {
      user.reload().then(() => {
        this.sync(user);
      });
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

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(this.navigateTo('/'))
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
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(this.navigateTo('/'));
  }

  loginWithFacebook() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(this.navigateTo('/'))
      .catch(error => {
        return this.zone.run(() => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            return this.afAuth.auth.fetchSignInMethodsForEmail(error.email).then(providers => {
              return this.zone.run(() => {
                console.log('providers', providers);
                const provider = new auth.GoogleAuthProvider();
                provider.setCustomParameters({ login_hint: error.email });
                return this.afAuth.auth.signInWithPopup(provider)
                  .then(this.navigateTo('/'));
              });
            });
          }
          console.log('error', error);
          return Promise.reject();
        });
      });
  }

  logout() {
    return this.afAuth.auth.signOut().then(this.navigateTo('/'));
  }

  createAccount(obj: UserData) {
    return this.afAuth.auth.createUserWithEmailAndPassword(obj.email, obj.password)
      .then(() => {
        const user = this.afAuth.auth.currentUser;
        return user.updateProfile({ displayName: obj.displayName, photoURL: obj.photoURL});
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
    return user.updateProfile({ displayName: obj.displayName, photoURL: obj.photoURL})
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

}


function providerIdFormat(providerId: string): string {
  if (/google/i.test(providerId)) {
    return 'Google';
  }
  if (/facebook/i.test(providerId)) {
    return 'Facebook';
  }
  return 'mail';
}