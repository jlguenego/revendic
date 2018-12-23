import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateRevendicationComponent } from './create-revendication/create-revendication.component';
import { PresentationComponent } from './presentation/presentation.component';
import { ObservatoireComponent } from './observatoire/observatoire.component';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateRevendicationComponent,
    PresentationComponent,
    ObservatoireComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
