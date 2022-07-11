import { TestBed } from '@angular/core/testing';

import { LogoutRequiredGuard } from './logout-required.guard';

describe('LogoutRequiredGuard', () => {
  let guard: LogoutRequiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogoutRequiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
