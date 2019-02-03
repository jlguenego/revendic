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
import { Text2htmlPipe } from './text2html.pipe';
import { ExcerptPipe } from './excerpt.pipe';
import { IsLoadingComponent } from './is-loading/is-loading.component';

@NgModule({
  declarations: [
    DividerComponent,
    PasswordComponent,
    SocialLoginComponent,
    PasswordCheckComponent,
    PopupComponent,
    AnchorDirective,
    ClickStopPropagationDirective,
    MetaDirective,
    Text2htmlPipe,
    ExcerptPipe,
    IsLoadingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MetaModule.forRoot()
  ],
  exports: [
    DividerComponent,
    IsLoadingComponent,
    PasswordComponent,
    SocialLoginComponent,
    PasswordCheckComponent,
    PopupComponent,
    AnchorDirective,
    ClickStopPropagationDirective,
    MetaDirective,
    Text2htmlPipe,
    ExcerptPipe,
  ]
})
export class WidgetModule { }
