import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMyRevendicationComponent } from './manage-my-revendication.component';

describe('ManageMyRevendicationComponent', () => {
  let component: ManageMyRevendicationComponent;
  let fixture: ComponentFixture<ManageMyRevendicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMyRevendicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMyRevendicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
