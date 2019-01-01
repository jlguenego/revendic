import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevRoutingModule } from './rev-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRevendicationComponent } from './create-revendication/create-revendication.component';
import { RevendicationListComponent } from './revendication-list/revendication-list.component';
import { ManageMyRevendicationComponent } from './routes/manage-my-revendication/manage-my-revendication.component';

@NgModule({
  declarations: [CreateRevendicationComponent, RevendicationListComponent, ManageMyRevendicationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RevRoutingModule
  ],
  exports: [RevendicationListComponent]
})
export class RevModule { }
