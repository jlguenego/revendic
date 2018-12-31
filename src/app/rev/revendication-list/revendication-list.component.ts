import { Component, OnInit } from '@angular/core';

import { RevendicationRecord } from '../revendication.record';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-revendication-list',
  templateUrl: './revendication-list.component.html',
  styleUrls: ['./revendication-list.component.scss']
})
export class RevendicationListComponent implements OnInit {

  revendications: Observable<RevendicationRecord[]>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    // this.revendications = [
    //   {
    //     title: 'Je veux un gros SMIC !',
    //     author: {
    //       displayName: 'Marcel Duschmoll'
    //     }
    //   },
    //   {
    //     title: 'Je veux le RIC ou je casse tout !',
    //     author: {
    //       displayName: 'Simone Lavieille-Charue'
    //     }
    //   }
    // ];

    this.revendications = this.db.collection<RevendicationRecord>('/revendications').valueChanges();
      


  }

}
