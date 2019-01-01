import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject/subject.component';
import { TestComponent } from './routes/test/test.component';
import { TestRoutingModule } from './test-routing.module';

@NgModule({
  declarations: [
    SubjectComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
  ],
  exports: [
    SubjectComponent
  ]
})
export class TestModule { }
