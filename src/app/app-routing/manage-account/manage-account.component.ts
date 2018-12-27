import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {

  constructor(public user: UserService) { }

  ngOnInit() {
  }

  delete() {
    const answer = window.confirm('Etes vous sûr de vouloir effacer votre compte ? Vous ne pourrez pas revenir en arrière. Ceci est une action critique.')
    if (answer) {
      this.user.delete();
    }
  }

}
