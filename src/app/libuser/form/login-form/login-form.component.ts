import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/libuser/user/user.service';

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
      console.log('error2', errorCode);
      this.errorCode = errorCode;
    });
  }

}
