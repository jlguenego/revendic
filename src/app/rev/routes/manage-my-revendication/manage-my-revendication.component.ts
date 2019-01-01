import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RevendicationRecord } from '../../revendication.record';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-manage-my-revendication',
  templateUrl: './manage-my-revendication.component.html',
  styleUrls: ['./manage-my-revendication.component.scss']
})
export class ManageMyRevendicationComponent implements OnInit {

  revendications: Observable<RevendicationRecord[]>;

  constructor(private user: UserService, private db: AngularFirestore) { }

  ngOnInit() {
    this.revendications = this.db.collection<RevendicationRecord>(
      '/revendications',
      ref => ref.where("userid", "==", this.user.uid).orderBy('createdAt', 'desc')).valueChanges();

  }

}
