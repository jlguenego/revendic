import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { environment } from 'src/environments/environment';
import { IndicatorComponent } from './app-routing/indicator/indicator.component';
import { HomeComponent } from './app-routing/home/home.component';
import { ErrorComponent } from './app-routing/error/error.component';
import { LegalComponent } from './app-routing/legal/legal.component';
import { PageNotFoundComponent } from './app-routing/page-not-found/page-not-found.component';
import { PresentationComponent } from './app-routing/presentation/presentation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RevModule } from './rev/rev.module';
import { RouterModule } from '@angular/router';
import { StatModule } from './stat/stat.module';
import { AdminModule } from './admin/admin.module';
import * as moment from 'moment';

moment.locale('fr');

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent,
    IndicatorComponent,
    HomeComponent,
    ErrorComponent,
    LegalComponent,
    PageNotFoundComponent,
    PresentationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'revendic-whatever-1234er1234!@#$' }),
    RouterModule,
    FontAwesomeModule,
    RevModule,
    AdminModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    StatModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule { }
