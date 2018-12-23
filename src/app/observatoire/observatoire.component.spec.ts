import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservatoireComponent } from './observatoire.component';

describe('ObservatoireComponent', () => {
  let component: ObservatoireComponent;
  let fixture: ComponentFixture<ObservatoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservatoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
