import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

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

  constructor() { }

  ngOnInit() {
  }

  openSigninDialog() {
    this.isSigninDialogOpen = true;
  }

  closeSigninDialog() {
    this.isSigninDialogOpen = false;
  }

}
