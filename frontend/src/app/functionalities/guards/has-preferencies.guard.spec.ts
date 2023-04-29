import { TestBed } from '@angular/core/testing';

import { HasPreferenciesGuard } from './has-preferencies.guard';

describe('HasPreferenciesGuard', () => {
  let guard: HasPreferenciesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasPreferenciesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
