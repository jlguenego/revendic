import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PresentationComponent } from './presentation/presentation.component';
import { LegalComponent } from './legal/legal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WidgetModule } from '../widget/widget.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorComponent } from './error/error.component';
import { CommonModule } from '@angular/common';
import { RevModule } from '../rev/rev.module';
import { UserModule } from '../user/user.module';
import { TestModule } from '../test/test.module';
import { IndicatorComponent } from './indicator/indicator.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'indicateurs', component: IndicatorComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'mentions-legales', component: LegalComponent },
  { path: 'erreur', component: ErrorComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    TestModule,
    UserModule,
    RevModule,
    RouterModule.forRoot(routes), 
    CommonModule, 
    FontAwesomeModule, 
    WidgetModule
  ],
  declarations: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
