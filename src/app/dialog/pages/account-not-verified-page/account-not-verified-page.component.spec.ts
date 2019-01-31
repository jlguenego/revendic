import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNotVerifiedPageComponent } from './account-not-verified-page.component';

describe('AccountNotVerifiedPageComponent', () => {
  let component: AccountNotVerifiedPageComponent;
  let fixture: ComponentFixture<AccountNotVerifiedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountNotVerifiedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNotVerifiedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
