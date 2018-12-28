import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent implements OnInit {

  isPasswordTooWeak = false;

  f = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('account creation');
    this.user.createAccount(this.f.value).catch(
      error => {
        console.error('error2', error);
        if (error.code === 'weak-password') {
          console.log('hello')
          this.isPasswordTooWeak = true;
        }
      });
  }

}
