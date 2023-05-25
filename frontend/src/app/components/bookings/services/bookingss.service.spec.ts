import { TestBed } from '@angular/core/testing';

import { BookingssService } from './bookingss.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BookRoom } from 'src/app/models/book-room.model';
import { Room } from 'src/app/models/room.model';

describe('BookingssService', () => {
  const API_URL_ROOMS = 'http://localhost:6868/api/rooms';
  const API_URL_BOOKINGS = 'http://localhost:6868/api/bookings';
  let bookingService: BookingssService;
  let httpClient: HttpClientTestingModule;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingssService],
    });
    bookingService = TestBed.inject(BookingssService);
    httpClient = TestBed.inject(HttpClientTestingModule);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(bookingService).toBeTruthy();
  });

  it('get all Bookings API', () => {
    const testBookings: BookRoom[] = [];
    bookingService.getAllBookings().subscribe((data) => {
      expect(data).toEqual(testBookings);
    });
    const req = httpTestingController.expectOne(
      API_URL_BOOKINGS + '/findAllBookings'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testBookings);
    httpTestingController.verify();
  });

  it('get Room API', () => {
    const testData: Room = {
      id: 1,
      number: 'testNumber',
      type: 'common',
      price: 1222,
      extras: 'extras',
      imgURL: 'imgURL',
    };
    bookingService.getRoom(testData.id).subscribe((data) => {
      expect(data).toEqual(testData);
    });
    const req = httpTestingController.expectOne(
      API_URL_ROOMS + '/getRoom/' + testData.id
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('delete Booking API', () => {
    const testData = { id: 1 };
    const testMsg = { message: 'Booking with ID:1 deleted successfully!' };
    bookingService.deleteBooking(testData.id).subscribe((data) => {
      expect(data).toEqual(testMsg);
    });
    const req = httpTestingController.expectOne(
      API_URL_BOOKINGS + '/deleteBooking/' + testData.id
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush(testMsg);
    httpTestingController.verify();
  });
});
