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

const MAX_RANDOM = 1e9;

@Injectable({
  providedIn: 'root'
})
export class RevService {

  static ERROR = {
    UNKNOWN: 0,
  }

  constructor(
    private db: AngularFirestore,
    private user: UserService,
    private dialog: DialogService) { }

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

  like(r: RevendicationRecord) {
    console.log('like2', this.user.uid);
    return this.user.isConnected().then(() => {
      this.db.collection<LikeRecord>("likes").add({
        userid: this.user.uid,
        revid: r.id,
        type: 'like'
      }).catch(errorFn);

    }).catch(() => {
      this.dialog.show('needAccount', { operation: 'like'});
    });

  }

  dislike(r: RevendicationRecord) {
    console.log('like2', this.user.uid);
    this.db.collection<LikeRecord>("likes").add({ userid: this.user.uid, revid: r.id, type: 'dislike' })
      .catch(errorFn);
  }

  share(r: RevendicationRecord) {
    console.log('share2');
  }
}
