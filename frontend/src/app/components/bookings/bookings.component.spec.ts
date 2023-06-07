import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsComponent } from './bookings.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BookingssService } from './services/bookingss.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BookRoom } from 'src/app/models/book-room.model';
import { Observable, of, throwError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Room } from 'src/app/models/room.model';

describe('BookingsComponent', () => {
  let component: BookingsComponent;
  let fixture: ComponentFixture<BookingsComponent>;
  let debugElement: DebugElement;

  let matDialogSpy: { open: jasmine.Spy; afterAllClosed: jasmine.Spy };
  let bookingServiceSpy: { getAllBookings: jasmine.Spy; getRoom: jasmine.Spy };
  let testBookings: BookRoom[] = [];

  beforeEach(async () => {
    bookingServiceSpy = jasmine.createSpyObj('BookingssService', [
      'getAllBookings',
      'getRoom',
    ]);
    matDialogSpy = jasmine.createSpyObj('MatDialog', [
      'open',
      'afterAllClosed',
    ]);
    await TestBed.configureTestingModule({
      declarations: [BookingsComponent],
      imports: [MatTableModule, BrowserAnimationsModule],
      providers: [
        { provide: BookingssService, useValue: bookingServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;
    bookingServiceSpy.getAllBookings.and.returnValue(of(testBookings));
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all bookings - error', () => {
    testBookings = [];
    const testMsg = {
      status: 404,
      message: 'No bookings found',
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });
    bookingServiceSpy.getAllBookings.and.returnValue(
      throwError(() => errorResponse)
    );
    component.retrieveAllBookings();
    expect(bookingServiceSpy.getAllBookings.calls.count()).toBeGreaterThan(0);
  });

  it('should get rooms', () => {
    testBookings = [
      {
        id: 1,
        clientName: 'book1',
        roomId: 1,
        notes: 'notes',
        price: 1111,
        checkin: new Date('09/24/2023'),
        checkout: new Date('09/25/2023'),
      },
      {
        id: 2,
        clientName: 'book2',
        roomId: 2,
        notes: 'notes',
        price: 1111,
        checkin: new Date('09/24/2023'),
        checkout: new Date('09/25/2023'),
      },
    ];
    component.bookings = testBookings;
    bookingServiceSpy.getRoom.and.returnValue(of(Room));
    component.getRooms();
    expect(bookingServiceSpy.getRoom.calls.count()).toBeGreaterThan(0);
  });

  it('should get rooms - error 404', () => {
    testBookings = [
      {
        id: 1,
        clientName: 'book1',
        roomId: 1,
        notes: 'notes',
        price: 1111,
        checkin: new Date('09/24/2023'),
        checkout: new Date('09/25/2023'),
      },
      {
        id: 2,
        clientName: 'book2',
        roomId: 2,
        notes: 'notes',
        price: 1111,
        checkin: new Date('09/24/2023'),
        checkout: new Date('09/25/2023'),
      },
    ];
    const id = 1;
    const testMsg = {
      status: 404,
      message: `Could not find room with ID:${id}`,
    };
    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });

    bookingServiceSpy.getRoom.and.returnValue(throwError(() => errorResponse));
    component.bookings = testBookings;
    component.getRooms();
    expect(bookingServiceSpy.getRoom.calls.count()).toBeGreaterThan(0);
  });

  it('should get room number', () => {
    const testRooms: Room[] = [
      {
        id: 1,
        number: '1212',
        type: 'common',
        price: 0,
        extras: 'nope',
        imgURL: '---',
      },
      {
        id: 2,
        number: '123',
        type: 'common',
        price: 0,
        extras: 'found',
        imgURL: '---',
      },
    ];
    component.rooms = testRooms;
    let roomCheck: string | undefined = component.getRoomNumber(2);
    expect(roomCheck).toEqual('123');
  });

  it('should get room - 200', () => {
    const testRoom: Room = {
      id: 1,
      number: '1212',
      type: 'common',
      price: 0,
      extras: 'nope',
      imgURL: '---',
    };

    bookingServiceSpy.getRoom.and.returnValue(of(testRoom));
    component.getRoom(testRoom.id);
    expect(component.room).toBe(testRoom);
  });
  it('should get room - 404', () => {
    const testMsg = {
      status: 404,
      message: 'No Room type.',
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });

    bookingServiceSpy.getRoom.and.returnValue(throwError(() => errorResponse));
    component.getRoom(1);
    expect(bookingServiceSpy.getRoom.calls.count()).toBeGreaterThan(0);
  });

  it('should click remove btn', () => {
    const id = 1;

    // let book = bookingServiceSpy.getAllBookings.and.returnValue(of(rooms))
    // matDialogSpy.afterAllClosed.and.returnValue(of(book))
    // matDialogSpy.afterAllClosed().subscribe(()=>{console.log("AA")})

    // matDialogSpy.afterAllClosed.and.returnValue('')
    // matDialogSpy.afterAllClosed.and.returnValue({ subscribe: () => {} })
    // matDialogSpy.afterAllClosed
    matDialogSpy.open.and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<typeof component>);

    component.clickedRemove(id);
    expect(matDialogSpy.open).toHaveBeenCalled()
  });
});
