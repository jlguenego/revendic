import { TestBed } from '@angular/core/testing';

import { AngularFirestoreService } from './angular-firestore.service';

describe('AngularFirestoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularFirestoreService = TestBed.get(AngularFirestoreService);
    expect(service).toBeTruthy();
  });
});
