import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { WidgetModule } from '../widget/widget.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    WidgetModule,
    FontAwesomeModule
  ],
  exports: [
    UserManagementComponent
  ]
})
export class UserModule { }
