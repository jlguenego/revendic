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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'creer-revendication', component: CreateRevendicationComponent },
  { path: 'observatoire', component: ObservatoireComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'mentions-legales', component: LegalComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormModule, FontAwesomeModule, WidgetModule],
  declarations: [
    HomeComponent,
    CreateRevendicationComponent,
    ObservatoireComponent,
    PresentationComponent,
    LegalComponent,
    LoginComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
