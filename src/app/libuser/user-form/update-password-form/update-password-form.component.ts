import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.scss']
})
export class UpdatePasswordFormComponent implements OnInit {

  f: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  constructor(private user: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('submit');
    this.user.updatePassword(this.f.value.password, this.f.value.newPassword);
  }

}
