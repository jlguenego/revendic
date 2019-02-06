import { Injectable } from '@angular/core';
import { RevendicationRecord } from './revendication.record';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { LikeRecord } from './like.record';
import { dbg } from 'src/environments/environment';
import { AngularFirestoreUtilsService } from '../angular-firestore-utils.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(
    private afs: AngularFirestore,
    private afu: AngularFirestoreUtilsService) { }

  getCount$(rev: RevendicationRecord, type = "like") {
    const like = (type === "like") ? 1 : -1;
    return this.afs.collection<LikeRecord>(`likes-revendications/${rev.id}/users/`)
      .valueChanges().pipe(
        map(docs => docs.filter(doc => doc.like === like).length)
      );
  }

  getVoters$(rev: RevendicationRecord) {
    return this.afu.query(this.afs.collection<LikeRecord>(`likes-revendications/${rev.id}/users/`));
  }

  mapLikes = map<RevendicationRecord[], any>(revs => revs.map(this.mapLike));

  mapLike = (rev: RevendicationRecord): RevendicationRecord => {
    if (rev) {
      rev.likes$ = this.getCount$(rev, "like");
      rev.dislikes$ = this.getCount$(rev, "dislike");
      rev.voters$ = this.getVoters$(rev);
    }
    return rev;
  };
  
}
