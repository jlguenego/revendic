import { Component, OnInit, Input } from '@angular/core';

import { RevendicationRecord } from '../revendication.record';
import { Observable } from 'rxjs';
import { RevService } from '../rev.service';
import { ListRevService } from '../list-rev.service';
import { faBullhorn, faShare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-revendication-list',
  templateUrl: './revendication-list.component.html',
  styleUrls: ['./revendication-list.component.scss']
})
export class RevendicationListComponent implements OnInit {

  faBullhorn = faBullhorn;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faShare = faShare;

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
      this.revendications = this.listRev.allRevs$;
    }
  }

  getLink(r: RevendicationRecord) {
    return this.rev.getLink(r);
  }

  like(r: RevendicationRecord) {
    this.rev.like(r);
  }

  dislike(r: RevendicationRecord) {
    this.rev.dislike(r);
  }

  share(r: RevendicationRecord) {
    this.rev.share(r);
  }
}
