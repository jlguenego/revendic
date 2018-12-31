import { TestBed } from '@angular/core/testing';

import { RevService } from './rev.service';

describe('RevService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RevService = TestBed.get(RevService);
    expect(service).toBeTruthy();
  });
});
