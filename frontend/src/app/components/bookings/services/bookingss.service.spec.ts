import { TestBed } from '@angular/core/testing';

import { BookingssService } from './bookingss.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BookRoom } from 'src/app/models/book-room.model';
import { Room } from 'src/app/models/room.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('BookingssService', () => {
  const API_URL_ROOMS = 'http://localhost:6868/api/rooms';
  const API_URL_BOOKINGS = 'http://localhost:6868/api/bookings';

  let bookingService: BookingssService;
  let httpClientSpy: { get: jasmine.Spy; delete: jasmine.Spy };


  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'delete']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BookingssService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    bookingService = TestBed.inject(BookingssService);

  });

  it('should be created', () => {
    expect(bookingService).toBeTruthy();
  });

  it('should get all Bookings API - 200', (done: DoneFn) => {
    const testBookings: BookRoom[] = [
      {
        id: 1,
        clientName: 'Client 1',
        checkin: new Date('2023-04-11 15:28:10'),
        checkout: new Date('2023-05-11 15:28:10'),
        price: 111,
        roomId: 1,
        notes: 'notes 1',
      },
      {
        id: 2,
        clientName: 'Client 2',
        checkin: new Date('2023-04-11 15:28:10'),
        checkout: new Date('2023-05-11 15:28:10'),
        price: 222,
        roomId: 2,
        notes: 'notes 2',
      },
    ];

    const testMsg = { status: 200, message: testBookings };

    httpClientSpy.get.and.returnValue(of(testMsg.message));
    bookingService.getAllBookings().subscribe({
      next: (res) => {
        expect(res).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should get all Bookings API - 404 no bookings found', (done: DoneFn) => {
    const testMsg = { status: 404, message: 'No bookings found' };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: 'No bookings found',
    });

    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
    bookingService.getAllBookings().subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should get Room - 200', (done: DoneFn) => {
    const testRoom: Room = {
      id: 1,
      number: 'Room1',
      type: 'common',
      price: 1111,
      extras: 'extras1',
      available: true,
      imgURL: '----',
    };

    const testMsg = { status: 200, message: testRoom };
    httpClientSpy.get.and.returnValue(of(testMsg.message));

    bookingService.getRoom(testRoom.id).subscribe({
      next: (res) => {
        expect(res).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should get Room - 404 room not found', (done: DoneFn) => {
    const id = 1;

    const testMsg = {
      status: 404,
      message: `Could not find room with ID:${id}`,
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: `Could not find room with ID:${id}`,
    });

    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
    bookingService.getRoom(id).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should delete booking - 200', (done: DoneFn) => {
    const id = 1;
    const testMsg = {
      status: 200,
      message: `Booking with ID:${id} deleted successfully!`,
    };

    httpClientSpy.delete.and.returnValue(of(testMsg.message));
    bookingService.deleteBooking(id).subscribe({
      next: (res) => {
        expect(res).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.delete.calls.count()).toBe(1);
  });

  it('should delete booking - 404', (done: DoneFn) => {
    const id = 1;
    const testMsg = {
      status: 404,
      message: `No booking with ID:${id} found for deletion.`,
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: `No booking with ID:${id} found for deletion.`,
    });

    httpClientSpy.delete.and.returnValue(throwError(() => errorResponse));
    bookingService.deleteBooking(id).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.delete.calls.count()).toBe(1);
  });
});
