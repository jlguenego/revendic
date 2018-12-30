import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserPath } from './user-path';
import { UserFormModule } from 'src/app/libuser/user-form/user-form.module';
import { WidgetModule } from 'src/app/widget/widget.module';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { AccountCreatedComponent } from './account-created/account-created.component';
import { ResetMailSentComponent } from './reset-mail-sent/reset-mail-sent.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { DeletedAccountComponent } from './deleted-account/deleted-account.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { UpdatedAccountComponent } from './updated-account/updated-account.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PasswordUpdatedComponent } from './password-updated/password-updated.component';

const path = UserPath.path;

const routes: Routes = [
  { path: path.login, component: LoginComponent },
  { path: 'nouveau-compte', component: CreateAccountComponent },
  { path: 'oubli-mot-de-passe', component: PasswordForgottenComponent },
  { path: 'compte-cree', component: AccountCreatedComponent },
  { path: 'email-mot-de-passe-envoye', component: ResetMailSentComponent },
  { path: 'mon-compte', component: ManageAccountComponent },
  { path: 'compte-efface', component: DeletedAccountComponent },
  { path: 'verifie-compte', component: VerifyAccountComponent },
  { path: 'compte-mis-a-jour', component: UpdatedAccountComponent },
  { path: path.updatePassword, component: UpdatePasswordComponent },
  { path: path.passwordUpdated, component: PasswordUpdatedComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    UserFormModule,
    FontAwesomeModule,
    WidgetModule
  ],
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
    PasswordUpdatedComponent
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
