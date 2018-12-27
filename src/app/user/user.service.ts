import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { FirebaseUtils } from '../FirebaseUtils';


@Injectable({
  providedIn: 'root',
})
export class UserService {


  isLogged = false;
  firstname = "";
  lastname = "";
  email = "";
  constructor(private afAuth: AngularFireAuth, private router: Router) {
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

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['']))
      .catch(error => {
        console.error('error', error);
        return Promise.reject();
      });
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(() => this.router.navigate(['/']));
  }

  loginWithFacebook() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(() => this.router.navigate(['/']))
      .catch(error => {
        console.log('error', error);
        if (error.code === 'auth/account-exists-with-different-credential') {
          return this.afAuth.auth.fetchProvidersForEmail(error.email).then(providers => {
            console.log('providers', providers);
            const provider = new auth.GoogleAuthProvider();
            provider.setCustomParameters({ login_hint: error.email });
            return this.afAuth.auth.signInWithPopup(provider)
              .then(() => this.router.navigate(['/']));
          });
        }
        return Promise.reject();
      });

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  createAccount(obj) {
    return this.afAuth.auth.createUserWithEmailAndPassword(obj.email, obj.password)
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
