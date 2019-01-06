import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RevendicationRecord } from '../../revendication.record';
import { Router } from '@angular/router';
import { ListRevService } from '../../list-rev.service';
import { RevService } from '../../rev.service';

@Component({
  selector: 'app-manage-my-revendications',
  templateUrl: './manage-my-revendications.component.html',
  styleUrls: ['./manage-my-revendications.component.scss']
})
export class ManageMyRevendicationsComponent implements OnInit {

  revendications$: Observable<RevendicationRecord[]>;

  constructor(
    private rev: RevService,
    private listRev: ListRevService,
    private router: Router) { }

  ngOnInit() {
    this.revendications$ = this.listRev.getMyRevs();
  }

  delete(revId: string) {
    const bool = window.confirm('Etes-vous sûr de vouloir effacer cette revendication ?');
    if (bool) {
      this.rev.delete(revId);
    }
  }

  update(revId: string) {
    this.router.navigate(['mes-revendications', 'edition', revId]);
  }

}
