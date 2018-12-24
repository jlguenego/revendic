import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form/login-form.component';
import { WidgetModule } from '../widget/widget.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    WidgetModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginFormComponent
  ]
})
export class FormModule { }
