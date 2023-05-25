import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;
  const testUser = {
    id: 1,
    username: 'admin',
    email: 'admin@admin.com',
    role: 'admin',
    isDisabled: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it('save User', () => {
    storageService.saveUser(testUser);
    expect(storageService.isLoggedIn()).toBeTrue();
  });

  it('get User (exists)', () => {
    storageService.saveUser(testUser);
    expect(storageService.getUser()).toEqual(testUser);
  });

  it("get User (doesn't exist)", () => {
    storageService.clean();
    expect(storageService.getUser()).toEqual({});
  });

  it('Is not loggedIn', () => {
    +storageService.clean();
    expect(storageService.isLoggedIn()).toBeFalse();
  });

  it('is Admin', () => {
    storageService.saveUser(testUser);
    expect(storageService.isAdmin()).toBeTrue();
  });

  it('is not Admin', () => {
    const testUser2 = {
      id: 2,
      username: 'mod',
      email: 'mod@mod.com',
      role: 'moderator',
      isDisabled: false,
    };
    storageService.saveUser(testUser2);
    expect(storageService.isAdmin()).toBeFalse();
  });
});
