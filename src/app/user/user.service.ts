import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  isLogged = false;
  firstname = "";
  lastname = "";
  email = "";
  constructor(public afAuth: AngularFireAuth) {
    afAuth.user.subscribe(user => {
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
  
  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginWithFacebook() {
    window.alert('not yet implemented');
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
