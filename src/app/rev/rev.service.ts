import { Injectable } from '@angular/core';
import { RevendicationRecord } from './revendication.record';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserService } from '../user/user.service';
import { firestore } from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevService {

  static ERROR = {
    UNKNOWN: 0,
  }

  constructor(private db: AngularFirestore, private user: UserService) { }

  get(revId: string): Observable<RevendicationRecord> {
    console.log('get', revId);
    return this.db.doc<RevendicationRecord>(`/revendications/${revId}`).valueChanges();
  }

  add(content: string) {
    console.log('this.user.uid', this.user.uid);
    const timestamp = firestore.FieldValue.serverTimestamp();
    const revendicationRecord: RevendicationRecord = {
      title: content,
      author: this.user.displayName,
      createdAt: timestamp,
      userid: this.user.uid,
    };

    return this.db.collection("revendications").add(revendicationRecord).then(docRef => {
      console.log("Document written with ID: ", docRef.id);
    }).catch(error => {
      console.error("Error adding document: ", error);
      return Promise.reject(error);
    });
  }
}
