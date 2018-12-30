import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TestModule } from '../test.module';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
];

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TestModule,
  ],
  exports: [
    RouterModule
  ]
})
export class TestRoutingModule { }
