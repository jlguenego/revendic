import { Component, OnInit, Input } from '@angular/core';

import { RevendicationRecord } from '../revendication.record';
import { Observable } from 'rxjs';
import { RevService } from '../rev.service';
import { ListRevService } from '../list-rev.service';

@Component({
  selector: 'app-revendication-list',
  templateUrl: './revendication-list.component.html',
  styleUrls: ['./revendication-list.component.scss']
})
export class RevendicationListComponent implements OnInit {

  @Input() max: string;

  @Input() orderByUpdatedAt;
  @Input() mostLiked;
  @Input() random;

  revendications: Observable<RevendicationRecord[]> | Promise<RevendicationRecord[]>;

  constructor(
    private rev: RevService,
    private listRev: ListRevService) { }

  ngOnInit() {

    if (this.orderByUpdatedAt === '') {
      this.revendications = this.listRev.lastUpdatedRevs$;
    } else if (this.mostLiked === '') {
      this.revendications = this.listRev.revs$;
    } else if (this.random === '') {
      this.revendications = this.listRev.getRandomRevs(2);
    } else {
      this.revendications = this.listRev.revs$;
    }
  }

  getLink(r: RevendicationRecord) {
    return `/revendications/${r.id}/${toNiceUrlTitle(r.title)}`
  }

  like(r: RevendicationRecord) {
    console.log('like');
    this.rev.like(r);
  }

  dislike(r: RevendicationRecord) {
    console.log('dislike');
    this.rev.dislike(r);
  }

  share(r: RevendicationRecord) {
    console.log('share');
    this.rev.share(r);
  }
}

function toNiceUrlTitle(str: string): string {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, '-')
    .toLocaleLowerCase();
}
