import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { PasswordCheckService } from 'src/app/widget/password-check.service';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.scss']
})
export class UpdatePasswordFormComponent implements OnInit {

  f: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, this.check.validate()]),
  });

  constructor(public user: UserService, private check: PasswordCheckService) { }

  ngOnInit() {
    this.refresh();
    this.user.subject.subscribe(() => this.refresh());
  }

  refresh() {
    if (this.user.isFromSocialLogin()) {
      this.f.removeControl('password');
    }
  }

  onSubmit() {
    console.log('submit');
    this.user.updatePassword(this.f.value.password, this.f.value.newPassword);
  }

}
