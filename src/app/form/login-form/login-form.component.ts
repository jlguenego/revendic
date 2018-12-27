import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  isIncorrectPassword = false;

  f = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private user: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.user.login(this.f.value.email, this.f.value.password).catch(() => this.isIncorrectPassword = true);
  }

}
