import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DialogComponent } from './dialog/dialog.component';
import { NeedAccountDialogPageComponent } from './pages/need-account-dialog-page/need-account-dialog-page.component';
import { WidgetModule } from '../widget/widget.module';
import { RouterModule } from '@angular/router';
import { ShareDialogPageComponent } from './pages/share-dialog-page/share-dialog-page.component';

@NgModule({
  declarations: [
    DialogComponent,
    NeedAccountDialogPageComponent,
    ShareDialogPageComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    WidgetModule,
    RouterModule,
  ],
  exports: [
    DialogComponent,
  ],
  entryComponents: [
    NeedAccountDialogPageComponent,
    ShareDialogPageComponent
  ]
})
export class DialogModule { }
