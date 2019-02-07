import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { RevendicationRecord } from './revendication.record';
import { AngularFirestoreUtilsService } from '../angular-firestore-utils.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ListRevService {

  allRevs$: Observable<RevendicationRecord[]>;

  constructor(
    private db: AngularFirestore,
    private afu: AngularFirestoreUtilsService,
    private user: UserService,
  ) {
    this.initAllRevs();
  }

  getMyRevs() {
    return this.afu.query(this.db.collection<RevendicationRecord>(
      '/revendications',
      ref => ref.where("userid", "==", this.user.uid)
        .orderBy('createdAt', 'desc')));
  }

  initAllRevs() {
    this.allRevs$ = new BehaviorSubject<RevendicationRecord[]>([]);
    this.afu.query(this.db.collection<RevendicationRecord>(
      '/revendications')).subscribe(this.allRevs$ as BehaviorSubject<RevendicationRecord[]>);
  }

}
