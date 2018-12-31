import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgottenFormComponent } from './password-forgotten-form.component';

describe('PasswordForgottenFormComponent', () => {
  let component: PasswordForgottenFormComponent;
  let fixture: ComponentFixture<PasswordForgottenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordForgottenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordForgottenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
