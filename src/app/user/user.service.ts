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
  constructor(public afAuth: AngularFireAuth) {
    afAuth.user.subscribe(user => {
      console.log('user', user);
      this.isLogged = user ? true : false;
    });
  }
  
  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
