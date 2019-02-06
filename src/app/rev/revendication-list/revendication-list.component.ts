import { Component, OnInit, Input } from '@angular/core';

import { RevendicationRecord } from '../revendication.record';
import { Observable } from 'rxjs';
import { RevService } from '../rev.service';
import { ListRevService } from '../list-rev.service';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faShareSquare, faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { map, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-revendication-list',
  templateUrl: './revendication-list.component.html',
  styleUrls: ['./revendication-list.component.scss']
})
export class RevendicationListComponent implements OnInit {

  faBullhorn = faBullhorn;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faShareSquare = faShareSquare;

  @Input() max: string;

  @Input() orderByCreatedAt;
  @Input() mostLiked;
  @Input() random;

  revendications: Observable<RevendicationRecord[]> | Promise<RevendicationRecord[]>;

  constructor(
    private rev: RevService,
    private listRev: ListRevService) { }

  ngOnInit() {

    if (this.orderByCreatedAt === '') {
      this.revendications = this.listRev.lastCreatedRevs$;
    } else if (this.mostLiked === '') {
      this.revendications = this.listRev.allRevsWithLike$.pipe(
        map(revs => revs.sort((reva, revb) => {
          const getLikes = rev => {
            if (!rev.voters) {
              return 0;
            }
            return rev.voters.filter(voter => voter.like === 1).length;
          };
          return getLikes(reva) < getLikes(revb) ? 1 : -1;
        }).slice(0, 3))
      );
    } else if (this.random === '') {
      this.revendications = this.listRev.allRevs$.pipe(
        map(revs => {
          const times = 2;
          let length = revs.length;
          if (length < times) {
            return revs;
          }
          const result = [];
          for (let i = 0; i < times; i++) {
            const index = Math.floor(Math.random() * length);
            result.push(revs[index]);
            length--;
          }
          return result;
        }),
        filter(revs => revs.length === 2),
        take(1)
      );
    } else {
      this.revendications = this.listRev.allRevsWithLike$;
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
