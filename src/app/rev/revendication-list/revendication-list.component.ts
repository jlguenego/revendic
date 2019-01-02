import { Component, OnInit, Input } from '@angular/core';

import { RevendicationRecord } from '../revendication.record';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { randomBytes } from 'crypto';
import { RevService } from '../rev.service';

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

  revendications: Observable<RevendicationRecord[]>;

  constructor(private db: AngularFirestore, private rev: RevService) { }

  ngOnInit() {
    const max = +this.max;
    const pipeLimit = (filter) => {
      if (max > 0) {
        return ref => filter(ref).limit(max);
      } else {
        return filter;
      }
    }

    if (this.orderByUpdatedAt === '') {
      console.log('orderByUpdatedAt');
      const filter = ref => ref.orderBy('updatedAt', 'desc');
      this.revendications = this.db.collection<RevendicationRecord>(
        '/revendications', pipeLimit(filter)).valueChanges();
      // } else if (this.mostLiked === '') {
      //   console.log('mostLiked');
      //   this.revendications = this.db.
    } else if (this.random === '') {
      console.log('random');
      const mx = max || 5;
      this.revendications = Observable.create(observer => {
        console.log('start random');
        let revendications = [];
        const random = this.rev.random();
        const filter = ref => ref.where("_random", "<=", random).orderBy("_random").limit(mx);
        this.db.collection<RevendicationRecord>(
          '/revendications', filter).valueChanges().subscribe(revs => {
            console.log('revs', revs);
            revendications.push(...revs);
            if (revendications.length >= mx) {
              return;
            }
            console.log('revendications.length', revendications.length);
            const filter = ref => ref.where("_random", ">=", random).orderBy("_random").limit(mx - revendications.length);
            this.db.collection<RevendicationRecord>(
              '/revendications', filter).valueChanges().subscribe(revs => {
                console.log('revs2', revs);
                revendications.push(...revs);
                observer.next(revendications);
              });
          });

      });





    } else {
      console.log('default');
      const filter = ref => ref.orderBy('createdAt', 'desc');
      this.revendications = this.db.collection<RevendicationRecord>(
        '/revendications', pipeLimit(filter)).valueChanges();
    }

  }

}
