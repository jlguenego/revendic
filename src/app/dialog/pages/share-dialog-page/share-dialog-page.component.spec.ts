import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDialogPageComponent } from './share-dialog-page.component';

describe('ShareDialogPageComponent', () => {
  let component: ShareDialogPageComponent;
  let fixture: ComponentFixture<ShareDialogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareDialogPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareDialogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
