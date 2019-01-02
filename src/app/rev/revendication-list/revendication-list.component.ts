import { Component, OnInit, Input } from '@angular/core';

import { RevendicationRecord } from '../revendication.record';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-revendication-list',
  templateUrl: './revendication-list.component.html',
  styleUrls: ['./revendication-list.component.scss']
})
export class RevendicationListComponent implements OnInit {

  @Input() max: string;

  @Input() orderByUpdatedAt;

  revendications: Observable<RevendicationRecord[]>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    let filter = ref => ref.orderBy('createdAt', 'desc');
    if (this.orderByUpdatedAt === '') {
      console.log('orderByUpdatedAt');
      filter = ref => ref.orderBy('updatedAt', 'desc');
    }

    const max = +this.max;  
    let limitFilter = filter;
    if (max > 0) {
      limitFilter = ref => filter(ref).limit(max);
    }
    

    this.revendications = this.db.collection<RevendicationRecord>(
      '/revendications', limitFilter).valueChanges();



  }

}
