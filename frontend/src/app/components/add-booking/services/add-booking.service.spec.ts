import { TestBed } from '@angular/core/testing';

import { AddBookingService } from './add-booking.service';
import { BookRoom } from 'src/app/models/book-room.model';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AddBookingService', () => {
  const API_URL = 'http://localhost:6868/api/bookings';
  let addBookingService: AddBookingService;
  let httpClient: HttpClientTestingModule;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddBookingService],
    });
    addBookingService = TestBed.inject(AddBookingService);
    httpClient = TestBed.inject(HttpClientTestingModule);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(addBookingService).toBeTruthy();
  });

  it('add Booking API', () => {
    const testData: BookRoom = {
      clientName: 'testName',
      checkin: new Date('2023-04-11 15:28:10'),
      checkout: new Date('2023-05-11 15:28:10'),
      price: 100,
      roomId: 1,
      notes: 'notes',
    };
    const testMsg = { message: 'Booking Created' };
    addBookingService.createBooking(testData).subscribe((data) => {
      expect(data).toEqual(testMsg);
    });
    const req = httpTestingController.expectOne(API_URL + '/addBooking');
    expect(req.request.method).toEqual('POST');
    req.flush(testMsg);
    httpTestingController.verify();
  });
});
