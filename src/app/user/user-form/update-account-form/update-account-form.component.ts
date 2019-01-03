import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../user.service';

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
  });

  constructor(public user: UserService) { }

  ngOnInit() {
    this.user.subject.subscribe(() => {
      this.f.setValue({
        displayName: this.user.displayName,
        email: this.user.email,
        photoURL: this.user.photoURL,
      });
    });
  }

  onSubmit() {
    this.errorCode = undefined;

    this.user.testURL(this.f.value.photoURL).catch(error => {
      this.f.controls['photoURL'].setValue('/assets/user.svg');
    }).then(() => this.user.updateAccount(this.f.value)
    ).catch(errorCode => {
      this.errorCode = errorCode;
    });
  }

}
