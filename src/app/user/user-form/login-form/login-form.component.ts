import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { UserService } from '../../user.service';
import { dbg } from 'src/environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  errorCode: string;
  ERROR = UserService.ERROR;

  f = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private user: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.errorCode = undefined;
    this.user.login(this.f.value.email, this.f.value.password).catch(errorCode => {
      this.errorCode = errorCode;
    });
  }

}
