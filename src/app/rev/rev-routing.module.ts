import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRevendicationComponent } from './create-revendication/create-revendication.component';

const routes: Routes = [
  { path: 'creer-revendication', component: CreateRevendicationComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    CreateRevendicationComponent,
  ],
  exports: [RouterModule]
})
export class RevRoutingModule { }
