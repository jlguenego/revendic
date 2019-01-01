import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.revendications = this.db.collection<RevendicationRecord>(
      '/revendications',
      ref => ref.where("userid", "==", this.user.uid).orderBy('createdAt', 'desc')).valueChanges();

  }

}
