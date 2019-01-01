import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteDbComponent } from './write-db.component';

describe('WriteDbComponent', () => {
  let component: WriteDbComponent;
  let fixture: ComponentFixture<WriteDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
