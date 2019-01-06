import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { RevendicationRecord } from './revendication.record';
import { RevService } from './rev.service';
import { firestore } from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestoreUtilsService } from '../angular-firestore-utils.service';
import { UserService } from '../user/user.service';

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

  revs$: BehaviorSubject<RevendicationRecord[]>;
  lastUpdatedRevs$: BehaviorSubject<RevendicationRecord[]>;

  constructor(
    private db: AngularFirestore,
    private afu: AngularFirestoreUtilsService,
    private rev: RevService,
    private user: UserService
  ) {
    console.log('constructor listrevservice');
    this._db = firestore();
    this.initRevs();
    this.initLastUpdatedRevs();
  }

  getMyRevs() {
    return this.afu.query(this.db.collection<RevendicationRecord>(
          '/revendications',
          ref => ref.where("userid", "==", this.user.uid)
            .orderBy('createdAt', 'desc')));
  }

  initRevs(max: number = 3) {
    const filter = ref => ref;
    this.revs$ = new BehaviorSubject<RevendicationRecord[]>([]);
    this.afu.query(this.db.collection<RevendicationRecord>(
      '/revendications', pipeLimit(max, filter))).subscribe(this.revs$);
  }

  initLastUpdatedRevs(max: number = 5) {
    const filter = ref => ref.orderBy('updatedAt', 'desc');
    this.lastUpdatedRevs$ = new BehaviorSubject<RevendicationRecord[]>([]);
    this.afu.query(this.db.collection<RevendicationRecord>(
      '/revendications', pipeLimit(max, filter))).subscribe(this.lastUpdatedRevs$);
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
        console.log(doc.id, " => ", doc.data());
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
          console.log(doc.id, " => ", doc.data());
        });
        return revendications;
      });
    });
  }
}
