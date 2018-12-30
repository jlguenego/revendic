import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormModule } from 'src/app/form/form.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
import { UserPath } from './user-path';

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
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormModule,
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
    UpdatedAccountComponent
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
