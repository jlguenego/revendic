import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RevendicationRecord } from '../../revendication.record';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-manage-my-revendications',
  templateUrl: './manage-my-revendications.component.html',
  styleUrls: ['./manage-my-revendications.component.scss']
})
export class ManageMyRevendicationsComponent implements OnInit {

  revendications: Observable<RevendicationRecord[]>;

  constructor(private user: UserService, private db: AngularFirestore) { }

  ngOnInit() {
    this.revendications = this.db.collection<RevendicationRecord>('/revendications', ref => ref.where("userid", "==", this.user.uid)
      .orderBy('createdAt', 'desc')).snapshotChanges().pipe(
        map(changes => {
          console.log('changes', changes);
          return changes.map(change => {
            const data = change.payload.doc.data();
            const id = change.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  delete(id) {
    this.db.doc(`/revendications/${id}`).delete()
      .then((obj) => { console.log(obj) })
      .catch(
        error => console.error('error', error)
      );
  }

}
