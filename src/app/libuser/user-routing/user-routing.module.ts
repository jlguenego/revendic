import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/app-routing/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class UserRoutingModule { }
