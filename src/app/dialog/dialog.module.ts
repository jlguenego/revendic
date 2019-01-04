import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DialogComponent } from './dialog/dialog.component';
import { NeedAccountDialogPageComponent } from './pages/need-account-dialog-page/need-account-dialog-page.component';
import { WidgetModule } from '../widget/widget.module';

@NgModule({
  declarations: [
    DialogComponent,
    NeedAccountDialogPageComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    WidgetModule,
  ],
  exports: [
    DialogComponent,
  ],
  entryComponents: [
    NeedAccountDialogPageComponent,
  ]
})
export class DialogModule { }
