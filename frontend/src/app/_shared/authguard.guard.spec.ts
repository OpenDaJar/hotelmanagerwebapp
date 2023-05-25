import { TestBed } from '@angular/core/testing';

import { AuthguardGuard } from './authguard.guard';
import { StorageService } from '../_services/storage.service';

describe('AuthguardGuard', () => {
  let guard: AuthguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[AuthguardGuard,StorageService]
    });
    guard = TestBed.inject(AuthguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});
