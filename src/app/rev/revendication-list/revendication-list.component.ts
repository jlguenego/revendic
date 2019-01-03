import { Component, OnInit, Input } from '@angular/core';

import { RevendicationRecord } from '../revendication.record';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RevService } from '../rev.service';
import { AngularFirestoreService } from 'src/app/angular-firestore.service';
import { Router } from '@angular/router';

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

  constructor(
    private db: AngularFirestore,
    private afs: AngularFirestoreService,
    private rev: RevService,
    private router: Router) { }

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
      this.revendications = this.afs.query(this.db.collection<RevendicationRecord>(
        '/revendications', pipeLimit(filter)));
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
        const filter = ref => ref.where("_random", "<=", random).orderBy("_random", "desc").limit(mx);
        this.afs.query(this.db.collection<RevendicationRecord>(
          '/revendications', filter)).subscribe(revs => {
            console.log('revs', revs);
            revendications.push(...revs);
            if (revendications.length >= mx) {
              observer.next(revendications);
              return;
            }
            console.log('revendications.length', revendications.length);
            const filter = ref => ref.where("_random", ">=", random).orderBy("_random", "asc").limit(mx - revendications.length);
            this.afs.query(this.db.collection<RevendicationRecord>(
              '/revendications', filter)).subscribe(revs => {
                console.log('revs2', revs);
                revendications.push(...revs);
                observer.next(revendications);
              });
          });

      });





    } else {
      console.log('default');
      const filter = ref => ref.orderBy('createdAt', 'desc');
      this.revendications = this.afs.query(this.db.collection<RevendicationRecord>(
        '/revendications', pipeLimit(filter)));
    }

  }

  get(revId: string, revTitle: string = "") {
    this.router.navigate(['revendications', revId, toNiceUrlTitle(revTitle)])
  }

}

function toNiceUrlTitle(str: string): string {
  console.log('str', str);
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  console.log('str', str);
  str = str.replace(/ /g, '-');
  console.log('str', str);
  str = str.toLocaleLowerCase();
  console.log('str', str);
  return str;
}
