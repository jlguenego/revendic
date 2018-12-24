import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    DialogComponent
  ]
})
export class WidgetModule { }
