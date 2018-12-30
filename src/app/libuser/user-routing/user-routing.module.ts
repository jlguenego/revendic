import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/app-routing/login/login.component';
import { CreateAccountComponent } from 'src/app/app-routing/create-account/create-account.component';
import { PasswordForgottenComponent } from 'src/app/app-routing/password-forgotten/password-forgotten.component';
import { AccountCreatedComponent } from 'src/app/app-routing/account-created/account-created.component';
import { ResetMailSentComponent } from 'src/app/app-routing/reset-mail-sent/reset-mail-sent.component';
import { ManageAccountComponent } from 'src/app/app-routing/manage-account/manage-account.component';
import { DeletedAccountComponent } from 'src/app/app-routing/deleted-account/deleted-account.component';
import { VerifyAccountComponent } from 'src/app/app-routing/verify-account/verify-account.component';
import { UpdatedAccountComponent } from 'src/app/app-routing/updated-account/updated-account.component';
import { FormModule } from 'src/app/form/form.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WidgetModule } from 'src/app/widget/widget.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
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
