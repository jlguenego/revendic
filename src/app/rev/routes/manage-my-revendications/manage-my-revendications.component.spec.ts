import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMyRevendicationsComponent } from './manage-my-revendications.component';

describe('ManageMyRevendicationComponent', () => {
  let component: ManageMyRevendicationsComponent;
  let fixture: ComponentFixture<ManageMyRevendicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMyRevendicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMyRevendicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
