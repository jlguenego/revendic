import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevendicationComponent } from './revendication.component';

describe('RevendicationComponent', () => {
  let component: RevendicationComponent;
  let fixture: ComponentFixture<RevendicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevendicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevendicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
