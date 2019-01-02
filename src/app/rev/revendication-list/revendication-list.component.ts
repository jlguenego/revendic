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

  revendications: Observable<RevendicationRecord[]>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    const max = +this.max;
    let filter = ref => ref.orderBy('updatedAt', 'desc');
    if (max > 0) {
      filter = ref => ref.orderBy('updatedAt', 'desc').limit(max);
    }

    this.revendications = this.db.collection<RevendicationRecord>(
      '/revendications', filter).valueChanges();



  }

}
