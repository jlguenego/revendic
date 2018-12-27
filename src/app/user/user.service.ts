import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


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
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => this.router.navigate(['/home']));
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginWithFacebook() {
    window.alert('not yet implemented');
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
      .catch(error => this.router.navigate(['/email-mot-de-passe-envoye', { email: email + '..'}]));
  }
}
