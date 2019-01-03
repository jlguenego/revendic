import { Component, OnInit } from '@angular/core';
import { RevendicationRecord } from '../../revendication.record';
import { AngularFirestoreService } from 'src/app/angular-firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-revendication',
  templateUrl: './revendication.component.html',
  styleUrls: ['./revendication.component.scss']
})
export class RevendicationComponent implements OnInit {

  r: RevendicationRecord;
  createdAt: Date = new Date();
  isMyRevendication = false;
  editLink;

  constructor(
    private user: UserService,
    private afs: AngularFirestoreService,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.afs.doc<RevendicationRecord>('/revendications', params.id).subscribe(r => {
        this.r = r;
        if (r === undefined) {
          return;
        }
        this.isMyRevendication = this.user.uid === this.r.userid;
        this.editLink = `/mes-revendications/edition/${r.id}`;
      });
    });
  }

  delete() {
    const bool = window.confirm('Etes-vous sûr de vouloir effacer cette revendication ?');
    if (bool) {
      this.db.doc(`/revendications/${this.r.id}`).delete()
        .then((obj) => {
          this.router.navigate(['/'])
        })
        .catch(
          error => console.error('error', error)
        );
    }
  }

}
