import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRevendicationComponent } from './create-revendication/create-revendication.component';
import { AuthGuardServiceGuard } from '../user/auth-guard-service.guard';

const routes: Routes = [
  { path: 'creer-revendication', component: CreateRevendicationComponent, canActivate: [AuthGuardServiceGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevRoutingModule { }
