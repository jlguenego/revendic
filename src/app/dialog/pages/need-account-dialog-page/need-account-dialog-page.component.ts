import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog.service';
import { UserRoutes } from 'src/app/user/user-routes';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-need-account-dialog-page',
  templateUrl: './need-account-dialog-page.component.html',
  styleUrls: ['./need-account-dialog-page.component.scss']
})
export class NeedAccountDialogPageComponent implements OnInit {

  title = 'Et si vous obteniez un compte citoyen ?';
  data = {};

  constructor(
    public dialog: DialogService,
    private router: Router,
    private user: UserService) { }

  ngOnInit() {
  }

  login() {
    this.user.url = this.router.url;
    this.router.navigate([UserRoutes.url.login]);
  }

  createAccount() {
    this.user.url = this.router.url;
    this.router.navigate([UserRoutes.url.createAccount]);
  }

}
