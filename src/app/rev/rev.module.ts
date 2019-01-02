import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevRoutingModule } from './rev-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRevendicationComponent } from './create-revendication/create-revendication.component';
import { RevendicationListComponent } from './revendication-list/revendication-list.component';
import { ManageMyRevendicationsComponent } from './routes/manage-my-revendications/manage-my-revendications.component';
import { UpdateRevendicationComponent } from './routes/update-revendication/update-revendication.component';

@NgModule({
  declarations: [CreateRevendicationComponent, RevendicationListComponent, ManageMyRevendicationsComponent, UpdateRevendicationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RevRoutingModule
  ],
  exports: [RevendicationListComponent]
})
export class RevModule { }
