import { TestBed } from '@angular/core/testing';

import { AngularFirestoreUtilsService } from './angular-firestore-utils.service';

describe('AngularFirestoreUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularFirestoreUtilsService = TestBed.get(AngularFirestoreUtilsService);
    expect(service).toBeTruthy();
  });
});
