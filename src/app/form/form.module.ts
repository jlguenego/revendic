import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { WidgetModule } from '../widget/widget.module';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { PasswordForgottenFormComponent } from './password-forgotten-form/password-forgotten-form.component';


@NgModule({
  declarations: [LoginFormComponent, CreateAccountFormComponent, PasswordForgottenFormComponent],
  imports: [
    CommonModule,
    WidgetModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    LoginFormComponent,
    CreateAccountFormComponent,
    PasswordForgottenFormComponent
  ]
})
export class FormModule { }
