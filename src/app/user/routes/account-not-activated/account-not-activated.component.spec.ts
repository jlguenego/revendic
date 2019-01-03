import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNotActivatedComponent } from './account-not-activated.component';

describe('AccountNotActivatedComponent', () => {
  let component: AccountNotActivatedComponent;
  let fixture: ComponentFixture<AccountNotActivatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountNotActivatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNotActivatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
