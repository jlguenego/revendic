import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { WidgetModule } from '../widget/widget.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFormModule } from './user-form/user-form.module';
import { LoginComponent } from './routes/login/login.component';
import { CreateAccountComponent } from './routes/create-account/create-account.component';
import { PasswordForgottenComponent } from './routes/password-forgotten/password-forgotten.component';
import { AccountCreatedComponent } from './routes/account-created/account-created.component';
import { ResetMailSentComponent } from './routes/reset-mail-sent/reset-mail-sent.component';
import { ManageAccountComponent } from './routes/manage-account/manage-account.component';
import { DeletedAccountComponent } from './routes/deleted-account/deleted-account.component';
import { VerifyAccountComponent } from './routes/verify-account/verify-account.component';
import { UpdatedAccountComponent } from './routes/updated-account/updated-account.component';
import { UpdatePasswordComponent } from './routes/update-password/update-password.component';
import { PasswordUpdatedComponent } from './routes/password-updated/password-updated.component';
import { AccountNotActivatedComponent } from './routes/account-not-activated/account-not-activated.component';

@NgModule({
  declarations: [
    LoginComponent,
    CreateAccountComponent,
    PasswordForgottenComponent,
    AccountCreatedComponent,
    ResetMailSentComponent,
    ManageAccountComponent,
    DeletedAccountComponent,
    VerifyAccountComponent,
    UpdatedAccountComponent,
    UpdatePasswordComponent,
    PasswordUpdatedComponent,
    AccountNotActivatedComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    WidgetModule,
    UserFormModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
