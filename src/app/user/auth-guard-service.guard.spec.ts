import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardServiceGuard } from './auth-guard-service.guard';

describe('AuthGuardServiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardServiceGuard]
    });
  });

  it('should ...', inject([AuthGuardServiceGuard], (guard: AuthGuardServiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
