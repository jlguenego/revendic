import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DividerComponent } from './divider/divider.component';
import { PasswordComponent } from './password/password.component';
import { SocialLoginComponent } from './social-login/social-login.component';
import { PasswordCheckComponent } from './password-check/password-check.component';
import { PopupComponent } from './popup/popup.component';
import { AnchorDirective } from './anchor.directive';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';
import { MetaDirective } from './meta.directive';
import { MetaModule } from '@ngx-meta/core';

@NgModule({
  declarations: [
    DividerComponent,
    PasswordComponent,
    SocialLoginComponent,
    PasswordCheckComponent,
    PopupComponent,
    AnchorDirective,
    ClickStopPropagationDirective,
    MetaDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MetaModule.forRoot()
  ],
  exports: [
    DividerComponent,
    PasswordComponent,
    SocialLoginComponent,
    PasswordCheckComponent,
    PopupComponent,
    AnchorDirective,
    ClickStopPropagationDirective,
    MetaDirective
  ]
})
export class WidgetModule { }
