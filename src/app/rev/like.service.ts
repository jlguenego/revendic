import { Injectable } from '@angular/core';
import { RevendicationRecord } from './revendication.record';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { LikeRecord } from './like.record';
import { dbg } from 'src/environments/environment';
import { AngularFirestoreUtilsService } from '../angular-firestore-utils.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  cache = new Map<string, BehaviorSubject<LikeRecord[]>>();

  constructor(
    private afs: AngularFirestore,
    private afu: AngularFirestoreUtilsService) { }

  getVoters$(revid: string) {
    if (!this.cache.has(revid)) {
      const voters$ = new BehaviorSubject<LikeRecord[]>([]);
      this.afu.query(this.afs.collection<LikeRecord>(`likes-revendications/${revid}/users/`)).subscribe(voters$);
      this.cache.set(revid, voters$);
    }
    return this.cache.get(revid);
  }

  mapLikes = (o: Observable<RevendicationRecord[]>) => {
    return Observable.create(observer => {
      o.subscribe(revs => {
        revs.forEach(rev => {
          if (rev) {
            this.getVoters$(rev.id).subscribe(voters => {
              rev.voters = voters;
              observer.next(revs);
            });
          }
        });
        observer.next(revs);
      });
    });
  }

  mapLike = (o: Observable<RevendicationRecord>) => {
    return Observable.create(observer => {
      o.subscribe(rev => {
        if (rev) {
          this.getVoters$(rev.id).subscribe(voters => {
            rev.voters = voters;
            observer.next(rev);
          });
        }
        observer.next(rev);
      });
    });
  }

}
