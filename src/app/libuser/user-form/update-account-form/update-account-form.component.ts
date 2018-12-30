import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/libuser/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-account-form',
  templateUrl: './update-account-form.component.html',
  styleUrls: ['./update-account-form.component.scss']
})
export class UpdateAccountFormComponent implements OnInit {

  ERROR = UserService.ERROR;

  errorCode: string;

  fromSocialLogin = false;

  f: FormGroup = new FormGroup({
    displayName: new FormControl(this.user.displayName, [Validators.required]),
    email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    photoURL: new FormControl(this.user.photoURL),
  });;

  constructor(public user: UserService) { }

  ngOnInit() {
    console.log('this.user', this.user);
    
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