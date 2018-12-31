import { Component, OnInit } from '@angular/core';

import { RevendicationRecord } from '../revendication.record';

@Component({
  selector: 'app-revendication-list',
  templateUrl: './revendication-list.component.html',
  styleUrls: ['./revendication-list.component.scss']
})
export class RevendicationListComponent implements OnInit {

  revendications: RevendicationRecord[];

  constructor() { }

  ngOnInit() {
    this.revendications = [
      {
        title: 'Je veux un gros SMIC !',
        author: {
          displayName: 'Marcel Duschmoll'
        }
      },
      {
        title: 'Je veux le RIC ou je casse tout !',
        author: {
          displayName: 'Simone Lavieille-Charue'
        }
      }
    ]
  }

}
