import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllRevendicationsComponent } from './list-all-revendications.component';

describe('ListAllRevendicationsComponent', () => {
  let component: ListAllRevendicationsComponent;
  let fixture: ComponentFixture<ListAllRevendicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAllRevendicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllRevendicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
