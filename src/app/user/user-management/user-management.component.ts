import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ResponsiveService } from 'src/app/layout/responsive.service';
import { UserService } from '../user.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  isLogged = false;

  isSigninDialogOpen = false;

  faFacebook = faFacebook;
  faGoogle = faGoogle;

  firstname = '';
  lastname = '';

  constructor(public resp: ResponsiveService, public user: UserService) { }

  ngOnInit() {
    this.user.component = this;
  }

  openSigninDialog() {
    this.isSigninDialogOpen = true;
  }

  closeSigninDialog() {
    this.isSigninDialogOpen = false;
  }

}
