import { TestBed } from '@angular/core/testing';

import { BookingssService } from './bookingss.service';

describe('BookingssService', () => {
  let service: BookingssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
