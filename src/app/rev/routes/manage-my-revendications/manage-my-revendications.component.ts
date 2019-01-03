import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RevendicationRecord } from '../../revendication.record';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-my-revendications',
  templateUrl: './manage-my-revendications.component.html',
  styleUrls: ['./manage-my-revendications.component.scss']
})
export class ManageMyRevendicationsComponent implements OnInit {

  revendications: Observable<RevendicationRecord[]>;

  constructor(private user: UserService, private db: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.revendications = this.db.collection<RevendicationRecord>('/revendications', ref => ref.where("userid", "==", this.user.uid)
      .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
        map(changes => {
          return changes.map(change => {
            const data = change.payload.doc.data();
            const id = change.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  delete(revId: string) {
    const bool = window.confirm('Etes-vous sûr de vouloir effacer cette revendication ?');
    if (bool) {
      this.db.doc(`/revendications/${revId}`).delete()
        .then(obj => { })
        .catch(error => console.error('error', error));
    }
  }

  update(revId: string) {
    this.router.navigate(['mes-revendications', 'edition', revId]);
  }

}
