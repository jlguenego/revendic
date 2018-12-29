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

  f: FormGroup = new FormGroup({
    displayName: new FormControl(this.user.displayName, [Validators.required]),
    email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    photoURL: new FormControl(this.user.photoURL),
  });;

  constructor(private user: UserService, private router: Router, private passwordCheck: PasswordCheckService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('account update');
    this.errorCode = undefined;

    this.user.testURL(this.f.value.photoURL).catch(error => {
      console.log('set to default');
      this.f.controls['photoURL'].setValue('/assets/user.svg');
      console.log('new photo: ', this.f.value.photoURL);
    }).then(() => this.user.updateAccount(this.f.value)
    ).catch(errorCode => {
      console.log('error2', errorCode);
      this.errorCode = errorCode;
    });
  }

}
