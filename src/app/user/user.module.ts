import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { WidgetModule } from '../widget/widget.module';

@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    WidgetModule,
  ],
  exports: [
    UserManagementComponent
  ]
})
export class UserModule { }
