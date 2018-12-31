import { Injectable } from '@angular/core';
import { RevendicationRecord } from './revendication.record';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class RevService {

  static ERROR = {
    UNKNOWN: 0,
  }

  constructor(private db: AngularFirestore, private user: UserService, private router: Router) { }

  add(content: string) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const revendicationRecord: RevendicationRecord = {
      title: content,
      author: this.user.displayName,
      createdAt: timestamp,
    };

    this.db.collection("revendications").add(revendicationRecord).then(docRef => {
      console.log("Document written with ID: ", docRef.id);
      this.router.navigate(['/']);
    }).catch(error => {
      console.error("Error adding document: ", error);
    });
  }
}
