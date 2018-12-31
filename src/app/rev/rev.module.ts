import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevRoutingModule } from './rev-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRevendicationComponent } from './create-revendication/create-revendication.component';
import { RevendicationListComponent } from './revendication-list/revendication-list.component';

@NgModule({
  declarations: [CreateRevendicationComponent, RevendicationListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RevRoutingModule
  ],
  exports: [RevendicationListComponent]
})
export class RevModule { }
