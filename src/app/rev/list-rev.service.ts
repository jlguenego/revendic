import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { RevendicationRecord } from './revendication.record';
import { RevService } from './rev.service';
import { firestore } from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestoreUtilsService } from '../angular-firestore-utils.service';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { LikeService } from './like.service';
import { dbg } from 'src/environments/environment';

const pipeLimit = (max: number, filter: QueryFn) => {
  if (max > 0) {
    return ref => filter(ref).limit(max);
  } else {
    return filter;
  }
}



@Injectable({
  providedIn: 'root'
})
export class ListRevService {

  _db: firestore.Firestore;

  allRevs$: BehaviorSubject<RevendicationRecord[]>;
  revs$: BehaviorSubject<RevendicationRecord[]>;
  lastUpdatedRevs$: BehaviorSubject<RevendicationRecord[]>;

  mapLikes = map<RevendicationRecord[], any>(revs => revs.map(rev => {
    rev.likes = this.like.getCount$(rev, "like");
    rev.dislikes = this.like.getCount$(rev, "dislike");
    return rev;
  }));

  constructor(
    private db: AngularFirestore,
    private afu: AngularFirestoreUtilsService,
    private rev: RevService,
    private user: UserService,
    private like: LikeService,
  ) {
    this._db = firestore();
    this.initAllRevs();
    this.initRevs();
    this.initLastUpdatedRevs();
  }

  getMyRevs() {
    return this.afu.query(this.db.collection<RevendicationRecord>(
      '/revendications',
      ref => ref.where("userid", "==", this.user.uid)
        .orderBy('createdAt', 'desc')));
  }

  initAllRevs(max: number = 100) {
    const filter = ref => ref;
    this.allRevs$ = new BehaviorSubject<RevendicationRecord[]>([]);
    this.afu.query(this.db.collection<RevendicationRecord>(
      '/revendications', pipeLimit(max, filter)))
      .pipe(
        this.mapLikes.bind(this)
      )
      .subscribe(this.allRevs$);
  }

  initRevs(max: number = 3) {
    const filter = ref => ref;
    this.revs$ = new BehaviorSubject<RevendicationRecord[]>([]);
    this.afu.query(this.db.collection<RevendicationRecord>(
      '/revendications', pipeLimit(max, filter)))
      .pipe(
        this.mapLikes.bind(this)
      )
      .subscribe(this.revs$);
  }

  initLastUpdatedRevs(max: number = 5) {
    const filter = ref => ref.orderBy('updatedAt', 'desc');
    this.lastUpdatedRevs$ = new BehaviorSubject<RevendicationRecord[]>([]);
    this.afu.query(this.db.collection<RevendicationRecord>(
      '/revendications', pipeLimit(max, filter)))
      .pipe(
        this.mapLikes.bind(this)
      )
      .subscribe(this.lastUpdatedRevs$);

  }

  getRandomRevs(max: number = 5): Promise<RevendicationRecord[]> {
    const revendications: RevendicationRecord[] = [];
    const random = this.rev.random();
    // we get the data once (no observable)
    // so we use the native firestore API.

    const query = this._db.collection('/revendications').where("_random", "<=", random).orderBy("_random", "desc").limit(max);
    return query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const rev = {
          id: doc.id,
          ...doc.data()
        };
        revendications.push(rev);
      });
      if (revendications.length === max) {
        return revendications;
      }
      const query = this._db.collection('/revendications').where("_random", ">=", random).orderBy("_random", "asc").limit(max);
      return query.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const rev = {
            id: doc.id,
            ...doc.data()
          };
          revendications.push(rev);
        });
        return revendications;
      });
    }).then(revs => revs.map(rev => {
      rev.likes = this.like.getCount$(rev, "like");
      rev.dislikes = this.like.getCount$(rev, "dislike");
      return rev;
    }));
  }
}
