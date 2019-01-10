import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { WidgetModule } from '../widget/widget.module';
import { DialogModule } from '../dialog/dialog.module';
import { TestModule } from '../test/test.module';
import { UserModule } from '../user/user.module';
import { RevModule } from '../rev/rev.module';

@NgModule({
  declarations: [
    HeaderComponent, 
    BodyComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    WidgetModule,
    DialogModule,
    TestModule,
    UserModule,
    RevModule,
    AppRoutingModule,
  ],
  exports: [
    HeaderComponent, 
    BodyComponent,
    FooterComponent,
  ]
})
export class LayoutModule { }
