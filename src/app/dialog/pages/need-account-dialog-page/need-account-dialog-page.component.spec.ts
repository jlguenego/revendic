import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAccountDialogPageComponent } from './need-account-dialog-page.component';

describe('NeedAccountDialogPageComponent', () => {
  let component: NeedAccountDialogPageComponent;
  let fixture: ComponentFixture<NeedAccountDialogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedAccountDialogPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedAccountDialogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
