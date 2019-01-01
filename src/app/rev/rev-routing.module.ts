import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRevendicationComponent } from './create-revendication/create-revendication.component';
import { AuthGuardServiceGuard } from '../user/auth-guard-service.guard';
import { ManageMyRevendicationComponent } from './routes/manage-my-revendication/manage-my-revendication.component';

const routes: Routes = [
  { path: 'creer-revendication', component: CreateRevendicationComponent, canActivate: [AuthGuardServiceGuard] },
  { path: 'mes-revendications', component: ManageMyRevendicationComponent, canActivate: [AuthGuardServiceGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevRoutingModule { }
