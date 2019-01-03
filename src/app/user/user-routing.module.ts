import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRoutes } from './user-routes';
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

const path = UserRoutes.path;

const routes: Routes = [
  { path: path.login, component: LoginComponent },
  { path: path.createAccount, component: CreateAccountComponent },
  { path: path.passwordForgotten, component: PasswordForgottenComponent },
  { path: 'compte-cree', component: AccountCreatedComponent },
  { path: 'email-mot-de-passe-envoye', component: ResetMailSentComponent },
  { path: 'mon-compte', component: ManageAccountComponent },
  { path: 'compte-efface', component: DeletedAccountComponent },
  { path: 'verifie-compte', component: VerifyAccountComponent },
  { path: 'compte-mis-a-jour', component: UpdatedAccountComponent },
  { path: path.updatePassword, component: UpdatePasswordComponent },
  { path: path.passwordUpdated, component: PasswordUpdatedComponent },
  { path: path.accountNotActivated, component: AccountNotActivatedComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
