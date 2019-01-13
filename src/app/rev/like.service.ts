import { Injectable } from '@angular/core';
import { RevendicationRecord } from './revendication.record';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { LikeRecord } from './like.record';
import { dbg } from 'src/environments/environment';

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

  mapLikes = map<RevendicationRecord[], any>(revs => revs.map(this.mapLike));

  mapLike = (rev: RevendicationRecord): RevendicationRecord => {
    dbg('rev to map', rev);
    if (rev) {
      rev.likes = this.getCount$(rev, "like");
      rev.dislikes = this.getCount$(rev, "dislike");
    }
    return rev;
  };
  
}
