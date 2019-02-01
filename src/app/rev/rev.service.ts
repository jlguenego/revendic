import { Injectable } from '@angular/core';
import { RevendicationRecord } from './revendication.record';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserService } from '../user/user.service';
import { firestore } from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { LikeRecord } from './like.record';
import { errorFn } from '../common/utils';
import { DialogService } from '../dialog/dialog.service';
import { dbg, environment } from 'src/environments/environment';
import { FacebookService } from '../widget/facebook.service';

const MAX_RANDOM = 1e9;

@Injectable({
  providedIn: 'root'
})
export class RevService {

  static ERROR = {
    UNKNOWN: 0,
  }

  _db = firestore();

  constructor(
    private db: AngularFirestore,
    private user: UserService,
    private dialog: DialogService,
    private facebook: FacebookService) {


    this.user.onDeletionPromiseList.push(() => {
      return this._db.collection('/revendications').where("userid", "==", this.user.uid).get()
        .then(querySnapshot => {
          const promises = [];
          querySnapshot.forEach(doc => {
            const promise = doc.ref.delete();
            promises.push(promise);
          });
          return <Promise<any>>Promise.all(promises);
        });
    });

  }

  random() {
    return Math.round(Math.random() * MAX_RANDOM);
  }

  get(revId: string): Observable<RevendicationRecord> {
    return this.db.doc<RevendicationRecord>(`/revendications/${revId}`).valueChanges();
  }

  add(revendication: RevendicationRecord) {
    const timestamp = firestore.FieldValue.serverTimestamp();
    const revendicationRecord: RevendicationRecord = {
      ...revendication,
      author: this.user.displayName,
      createdAt: timestamp,
      updatedAt: timestamp,
      userid: this.user.uid,
      _random: this.random(),
    };

    return this.db.collection("revendications").add(revendicationRecord).then(docRef => {
    }).catch(error => {
      console.error("Error adding document: ", error);
      return Promise.reject(error);
    });
  }

  update(revId: string, revendication: RevendicationRecord): Promise<void> {
    const timestamp = firestore.FieldValue.serverTimestamp();
    const rev = { ...revendication };
    delete rev.id;
    rev.updatedAt = timestamp;


    const doc = this.db.collection("revendications").doc(revId);
    return doc.update(rev)
  }

  delete(revId: string) {
    return this.db.doc(`/revendications/${revId}`).delete()
      .then(obj => { })
      .catch(error => console.error('error', error));
  }

  like(r: RevendicationRecord) {
    return this.user.checkAccountVerified().then(() => {
      this.db.collection<LikeRecord>(`likes-revendications/${r.id}/users`).doc(this.user.uid).set({
        like: 1
      }).then(docRef => dbg('docRef', docRef)).catch(errorFn);
    });
  }

  dislike(r: RevendicationRecord) {
    return this.user.checkAccountVerified().then(() => {
      this.db.collection<LikeRecord>(`likes-revendications/${r.id}/users`).doc(this.user.uid).set({
        like: -1
      }).then(docRef => dbg('docRef', docRef)).catch(errorFn);
    });
  }

  share(r: RevendicationRecord) {
    const url = environment.domain + this.getLink(r);
    this.facebook.share(url);
  }

  getLink(r: RevendicationRecord) {
    return `/revendications/${r.id}/${toNiceUrlTitle(r.title)}`
  }
}

function toNiceUrlTitle(str: string): string {
  return str.normalize('NFD')
    .toLocaleLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ '"’]/g, '-')
    .replace(/[^a-z-]/g, '');
}

