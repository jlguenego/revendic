import { Injectable } from '@angular/core';
import { UserManagementComponent } from './user-management/user-management.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  component: UserManagementComponent;
  isLogged = false;
  firstname = "";
  lastname = "";
  constructor() { }
}
