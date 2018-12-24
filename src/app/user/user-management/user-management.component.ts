import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  isLogged = false;

  isSigninDialogOpen = false;


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
