import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule { }

export interface UserData {
  displayName: string;
  photoURL: string;
  email: string;
  password: string;
}

