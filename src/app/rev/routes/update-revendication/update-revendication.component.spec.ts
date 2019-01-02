import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRevendicationComponent } from './update-revendication.component';

describe('UpdateRevendicationComponent', () => {
  let component: UpdateRevendicationComponent;
  let fixture: ComponentFixture<UpdateRevendicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRevendicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRevendicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
