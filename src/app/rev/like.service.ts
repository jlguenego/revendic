import { Injectable } from '@angular/core';
import { RevendicationRecord } from './revendication.record';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { LikeRecord } from './like.record';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private afs: AngularFirestore) { }

  getCount$(rev: RevendicationRecord, type = "like") {
    const like = (type === "like") ? 1 : -1;
    return this.afs.collection<LikeRecord>(`likes-revendications/${rev.id}/users/`)
      .valueChanges().pipe(
        map(docs => docs.filter(doc => doc.like === like).length)
      );

  }

  
}
