import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateRevendicationComponent } from './create-revendication/create-revendication.component';
import { ObservatoireComponent } from './observatoire/observatoire.component';
import { PresentationComponent } from './presentation/presentation.component';
import { LegalComponent } from './legal/legal.component';
import { FormModule } from '../form/form.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WidgetModule } from '../widget/widget.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorComponent } from './error/error.component';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from '../libuser/user-routing/user-routing.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'creer-revendication', component: CreateRevendicationComponent },
  { path: 'observatoire', component: ObservatoireComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'mentions-legales', component: LegalComponent },
  { path: 'erreur', component: ErrorComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    UserRoutingModule, 
    RouterModule.forRoot(routes), 
    CommonModule, 
    FormModule, 
    FontAwesomeModule, 
    WidgetModule
  ],
  declarations: [
    HomeComponent,
    CreateRevendicationComponent,
    ObservatoireComponent,
    PresentationComponent,
    LegalComponent,
    PageNotFoundComponent,
    ErrorComponent,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
