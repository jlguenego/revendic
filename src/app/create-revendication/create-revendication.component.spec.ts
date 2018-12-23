import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRevendicationComponent } from './create-revendication.component';

describe('CreateRevendicationComponent', () => {
  let component: CreateRevendicationComponent;
  let fixture: ComponentFixture<CreateRevendicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRevendicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRevendicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
