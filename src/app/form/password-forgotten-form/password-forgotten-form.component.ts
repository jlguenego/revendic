import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-forgotten-form',
  templateUrl: './password-forgotten-form.component.html',
  styleUrls: ['./password-forgotten-form.component.scss']
})
export class PasswordForgottenFormComponent implements OnInit {

  f = new FormGroup({
    email: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

}
