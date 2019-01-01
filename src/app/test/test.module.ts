import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject/subject.component';
import { TestComponent } from './routes/test/test.component';
import { TestRoutingModule } from './test-routing.module';
import { WriteDbComponent } from './write-db/write-db.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SubjectComponent,
    TestComponent,
    WriteDbComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TestRoutingModule,
  ],
  exports: [
    SubjectComponent
  ]
})
export class TestModule { }
