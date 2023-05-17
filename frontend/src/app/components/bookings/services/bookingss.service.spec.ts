import { TestBed } from '@angular/core/testing';

import { BookingssService } from './bookingss.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookingssService', () => {
  let service: BookingssService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });
    service = TestBed.inject(BookingssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
