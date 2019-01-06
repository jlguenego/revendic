import { TestBed } from '@angular/core/testing';

import { ListRevService } from './list-rev.service';

describe('ListRevService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListRevService = TestBed.get(ListRevService);
    expect(service).toBeTruthy();
  });
});
