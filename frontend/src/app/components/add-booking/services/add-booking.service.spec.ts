import { TestBed } from '@angular/core/testing';

import { AddBookingService } from './add-booking.service';
import { BookRoom } from 'src/app/models/book-room.model';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('AddBookingService', () => {
  let addBookingService: AddBookingService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AddBookingService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    addBookingService = TestBed.inject(AddBookingService);
  });

  it('should be created', () => {
    expect(addBookingService).toBeTruthy();
  });

  it('should call add booking API - 200', (done: DoneFn) => {
    const testBooking: BookRoom = {
      clientName: 'testName',
      checkin: new Date('2023-04-11 15:28:10'),
      checkout: new Date('2023-05-11 15:28:10'),
      price: 100,
      roomId: 1,
      notes: 'notes',
    };

    const testMsg = { status: 200, message: 'Booking Created' };

    httpClientSpy.post.and.returnValue(of(testMsg));
    addBookingService.createBooking(testBooking).subscribe({
      next: (res) => {
        expect(res.status).toBe(testMsg.status);
        expect(res.message).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    });

    // addBookingService.createBooking(testBooking).subscribe((res) => {
    //   expect(res.status).toBe(testMsg.status);
    //   expect(res.message).toBe(testMsg.message);
    //   done();
    // });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should return error 404 - no room found', (done: DoneFn) => {
    const testBooking: BookRoom = {
      clientName: 'testName',
      checkin: new Date('2023-04-11 15:28:10'),
      checkout: new Date('2023-05-11 15:28:10'),
      price: 100,
      roomId: 1,
      notes: 'notes',
    };
    const testMsg = {
      status: 404,
      message: `Room with ID: ${testBooking.roomId} not found.`,
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: `Room with ID: ${testBooking.roomId} not found.`,
    });

    httpClientSpy.post.and.returnValue(throwError(() => errorResponse));
    addBookingService.createBooking(testBooking).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should return error 400 - price missing', (done: DoneFn) => {
    const testBooking: BookRoom = {
      clientName: 'testName',
      checkin: new Date('2023-04-11 15:28:10'),
      checkout: new Date('2023-05-11 15:28:10'),
      roomId: 1,
      notes: 'notes',
    };
    const testMsg = {
      status: 400,
      message: 'No price in Booking',
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });

    // httpClientSpy.post.and.returnValue(throwError(errorResponse));
    httpClientSpy.post.and.returnValue(throwError(() => errorResponse));
    addBookingService.createBooking(testBooking).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });
});
