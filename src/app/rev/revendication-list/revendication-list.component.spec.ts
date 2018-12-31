import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevendicationListComponent } from './revendication-list.component';

describe('RevendicationListComponent', () => {
  let component: RevendicationListComponent;
  let fixture: ComponentFixture<RevendicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevendicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevendicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
