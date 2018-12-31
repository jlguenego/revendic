import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService, UserData } from 'src/app/libuser/user/user.service';
import { PasswordCheckService } from 'src/app/widget/password-check.service';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent implements OnInit {

  ERROR = UserService.ERROR;

  errorCode: string;

  f = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.passwordCheck.validate()]),
  });

  constructor(private user: UserService, private router: Router, private passwordCheck: PasswordCheckService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('account creation');
    this.errorCode = undefined;
    const userData: UserData = {
      displayName: this.f.value.firstname + ' ' + this.f.value.lastname,
      photoURL: "/assets/user.svg",
      email: this.f.value.email,
      password: this.f.value.password
    };

    this.user.createAccount(userData).catch(
      errorCode => {
        console.log('error2', errorCode);
        this.errorCode = errorCode;
      });
  }

}
