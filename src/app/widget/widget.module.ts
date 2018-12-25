import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DividerComponent } from './divider/divider.component';
import { PasswordComponent } from './password/password.component';
import { SocialLoginComponent } from './social-login/social-login.component';

@NgModule({
  declarations: [
    DialogComponent,
    DividerComponent,
    PasswordComponent,
    SocialLoginComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    DialogComponent,
    DividerComponent,
    PasswordComponent,
    SocialLoginComponent,
  ]
})
export class WidgetModule { }
