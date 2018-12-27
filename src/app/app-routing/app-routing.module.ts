import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateRevendicationComponent } from './create-revendication/create-revendication.component';
import { ObservatoireComponent } from './observatoire/observatoire.component';
import { PresentationComponent } from './presentation/presentation.component';
import { LegalComponent } from './legal/legal.component';
import { LoginComponent } from './login/login.component';
import { FormModule } from '../form/form.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WidgetModule } from '../widget/widget.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { AccountCreatedComponent } from './account-created/account-created.component';
import { ResetMailSentComponent } from './reset-mail-sent/reset-mail-sent.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { DeletedAccountComponent } from './deleted-account/deleted-account.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'creer-revendication', component: CreateRevendicationComponent },
  { path: 'observatoire', component: ObservatoireComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'mentions-legales', component: LegalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nouveau-compte', component: CreateAccountComponent },
  { path: 'oubli-mot-de-passe', component: PasswordForgottenComponent },
  { path: 'compte-cree', component: AccountCreatedComponent },
  { path: 'email-mot-de-passe-envoye', component: ResetMailSentComponent },
  { path: 'mon-compte', component: ManageAccountComponent },
  { path: 'compte-efface', component: DeletedAccountComponent },
  { path: 'erreur', component: ErrorComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormModule, FontAwesomeModule, WidgetModule],
  declarations: [
    HomeComponent,
    CreateRevendicationComponent,
    ObservatoireComponent,
    PresentationComponent,
    LegalComponent,
    LoginComponent,
    CreateAccountComponent,
    PasswordForgottenComponent,
    AccountCreatedComponent,
    ResetMailSentComponent,
    PageNotFoundComponent,
    ManageAccountComponent,
    DeletedAccountComponent,
    ErrorComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
