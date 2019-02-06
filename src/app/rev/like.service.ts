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

  getVoters$(revid: string) {
    return this.afu.query(this.afs.collection<LikeRecord>(`likes-revendications/${revid}/users/`));
  }

  mapLikes = map<RevendicationRecord[], any>(revs => revs.map(this.mapLike));

  mapLike = (rev: RevendicationRecord): RevendicationRecord => {
    if (rev) {
      rev.voters$ = this.getVoters$(rev.id);
    }
    return rev;
  };
  
}
