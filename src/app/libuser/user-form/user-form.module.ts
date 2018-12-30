import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { PasswordForgottenFormComponent } from './password-forgotten-form/password-forgotten-form.component';
import { UpdateAccountFormComponent } from './update-account-form/update-account-form.component';
import { WidgetModule } from 'src/app/widget/widget.module';
import { UpdatePasswordFormComponent } from './update-password-form/update-password-form.component';


@NgModule({
  declarations: [
    LoginFormComponent, 
    CreateAccountFormComponent, 
    PasswordForgottenFormComponent,
     UpdateAccountFormComponent, 
     UpdatePasswordFormComponent],
  imports: [
    CommonModule,
    WidgetModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    LoginFormComponent,
    CreateAccountFormComponent,
    PasswordForgottenFormComponent,
    UpdateAccountFormComponent,
    UpdatePasswordFormComponent
  ]
})
export class UserFormModule { }
