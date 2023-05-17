import { TestBed } from '@angular/core/testing';

import { AddBookingService } from './add-booking.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddBookingService', () => {
  let service: AddBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });
    service = TestBed.inject(AddBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
