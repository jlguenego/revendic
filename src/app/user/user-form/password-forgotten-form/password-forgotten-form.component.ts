import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-password-forgotten-form',
  templateUrl: './password-forgotten-form.component.html',
  styleUrls: ['./password-forgotten-form.component.scss']
})
export class PasswordForgottenFormComponent implements OnInit {

  f = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  constructor(private user: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.user.sendForgottenPasswordEmail(this.f.value.email);
  }

}
