import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../AbstractValueAccessor';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [MakeProvider(PasswordComponent)],
})
export class PasswordComponent extends AbstractValueAccessor {

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  isVisible = false;
  isNewPassword = false;
  havingFocus = false;

  @Input('appPasswordNew') set appPasswordNew(val: any) {
    this.isNewPassword = true;
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  onFocus() {
    this.havingFocus = true;
  }
  onBlur() {
    this.havingFocus = false;
    this.onTouched();
  }

}
