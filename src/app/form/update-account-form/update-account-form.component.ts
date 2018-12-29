import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordCheckService } from 'src/app/widget/password-check.service';
import { UserData } from 'src/app/user/user.module';

@Component({
  selector: 'app-update-account-form',
  templateUrl: './update-account-form.component.html',
  styleUrls: ['./update-account-form.component.scss']
})
export class UpdateAccountFormComponent implements OnInit {

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
    console.log('account update');
    this.errorCode = undefined;
    const userData: UserData = {
      displayName: this.f.value.displayName,
      photoURL: this.f.value.photoURL,
      email: this.f.value.email,
      password: this.f.value.password
    };

    this.user.updateAccount(userData).catch(
      errorCode => {
        console.log('error2', errorCode);
        this.errorCode = errorCode;
      });
  }

}
