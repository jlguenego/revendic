import { Component, OnInit } from '@angular/core';
import { AbstractValueAccessor } from '../AbstractValueAccessor';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent extends AbstractValueAccessor {

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  isVisible = false;

  toggle() {
    this.isVisible = !this.isVisible;
  }

}
