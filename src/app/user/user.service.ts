import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { FirebaseUtils } from '../FirebaseUtils';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  public static ERROR = {
    MAIL_ALREADY_IN_USE: 'mail-already-in-use',
    WEAK_PASSWORD: 'weak-password',
  };


  isLogged = false;
  firstname = "";
  lastname = "";
  email = "";
  constructor(private afAuth: AngularFireAuth, private router: Router, private zone: NgZone) {
    this.afAuth.user.subscribe(user => {
      console.log('user', user);
      this.isLogged = user ? true : false;
      if (user) {
        this.firstname = user.displayName;
        this.lastname = user.displayName;
        this.email = user.email;
      } else {
        this.firstname = "";
        this.lastname = "";
        this.email = "";
      }

    });
  }

  navigateTo(path) {
    return () => {
      return this.zone.run(() => {
        this.router.navigate([path]);
      });
    }
  };

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(this.navigateTo('/'))
      .catch(error => {
        console.error('error', error);
        return Promise.reject();
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
          return Promise.reject();
        });
      });

  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  createAccount(obj) {
    return this.afAuth.auth.createUserWithEmailAndPassword(obj.email, obj.password)
      .then(this.navigateTo('/compte-cree'))
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

}
