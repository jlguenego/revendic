import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevRoutingModule } from './rev-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRevendicationComponent } from './create-revendication/create-revendication.component';

@NgModule({
  declarations: [CreateRevendicationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RevRoutingModule
  ]
})
export class RevModule { }
