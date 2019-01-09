import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRevendicationComponent } from './create-revendication/create-revendication.component';
import { AuthGuardServiceGuard } from '../user/auth-guard-service.guard';
import { ManageMyRevendicationsComponent } from './routes/manage-my-revendications/manage-my-revendications.component';
import { UpdateRevendicationComponent } from './routes/update-revendication/update-revendication.component';
import { RevendicationComponent } from './routes/revendication/revendication.component';
import { ListAllRevendicationsComponent } from './routes/list-all-revendications/list-all-revendications.component';

const routes: Routes = [
  { path: 'creer-revendication', component: CreateRevendicationComponent, canActivate: [AuthGuardServiceGuard] },
  { path: 'mes-revendications', component: ManageMyRevendicationsComponent, canActivate: [AuthGuardServiceGuard] },
  { path: 'mes-revendications/edition/:id', component: UpdateRevendicationComponent, canActivate: [AuthGuardServiceGuard] },
  { path: 'revendications/:id/:title', component: RevendicationComponent },
  { path: 'revendications', component: ListAllRevendicationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevRoutingModule { }
