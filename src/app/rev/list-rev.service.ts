import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AngularFirestoreService } from '../angular-firestore.service';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { RevendicationRecord } from './revendication.record';

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

  constructor(
    private db: AngularFirestore,
    private afs: AngularFirestoreService,
  ) { 
    console.log('constructor listrevservice');
  }

  listLastUpdatedRev(max: number = 2): Observable<RevendicationRecord[]> {
    const filter = ref => ref.orderBy('updatedAt', 'desc');
    return this.afs.query(this.db.collection<RevendicationRecord>(
        '/revendications', pipeLimit(max, filter)));
  }
}
