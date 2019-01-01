import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';
import { UserRoutes } from '../../user-routes';



@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {

  constructor(public user: UserService) { }

  updatePasswordLink = UserRoutes.url.updatePassword;

  ngOnInit() {
  }

  delete() {
    const answer = window.confirm('Etes vous sûr de vouloir effacer votre compte ? Vous ne pourrez pas revenir en arrière. Ceci est une action critique.')
    if (answer) {
      this.user.delete();
    }
  }

  isFromSocialLogin() {
    return this.user.isFromSocialLogin();
  }

}
