import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { WidgetModule } from '../widget/widget.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    WidgetModule,
  ],
  exports: [
    LoginFormComponent
  ]
})
export class FormModule { }
