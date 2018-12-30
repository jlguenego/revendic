import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedAccountComponent } from './deleted-account.component';

describe('DeletedAccountComponent', () => {
  let component: DeletedAccountComponent;
  let fixture: ComponentFixture<DeletedAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
