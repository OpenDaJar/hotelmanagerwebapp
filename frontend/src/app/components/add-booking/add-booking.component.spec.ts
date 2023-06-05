import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingComponent } from './add-booking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddBookingService } from './services/add-booking.service';
import { RoomService } from '../rooms/services/room.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { BookRoom } from 'src/app/models/book-room.model';

describe('AddBookingComponent', () => {
  let component: AddBookingComponent;
  let fixture: ComponentFixture<AddBookingComponent>;
  let debugElement: DebugElement;
  // let roomService:RoomService
  let roomServiceSpy: { getRoomByType: jasmine.Spy };
  let addBookingServiceSpy: { createBooking: jasmine.Spy };

  beforeEach(async () => {
    roomServiceSpy = jasmine.createSpyObj('RoomService', ['getRoomByType']);
    addBookingServiceSpy = jasmine.createSpyObj('AddBookingService', [
      'createBooking',
    ]);

    //TestBed
    await TestBed.configureTestingModule({
      declarations: [AddBookingComponent],
      imports: [MatTableModule, ReactiveFormsModule],
      providers: [
        { provide: AddBookingService, useValue: addBookingServiceSpy },
        { provide: RoomService, useValue: roomServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;

    // roomService = TestBed.inject(RoomService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate booking price', () => {
    // const { debugElement } = fixture;
    const calculateBookingBtn = debugElement.query(
      By.css('[data-testid="calculate-booking-btn"]')
    );
    const checkin = new Date('09/24/2023');
    const checkout = new Date('09/25/2023');
    const testRoom: Room = {
      price: 1000,
    };

    component.addBookingForm.controls['checkin'].setValue(checkin);
    component.addBookingForm.controls['checkout'].setValue(checkout);
    component.selectedRoom = testRoom;

    calculateBookingBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.bookingPrice).toBe(1000);
  });

  it('should cancel selected Room', () => {
    component.displayRooms = true;
    component.displaySelected = true;

    fixture.detectChanges();
    const cancelSelectionBtn = debugElement.query(
      By.css('[data-testid="cancel-selection-btn"]')
    );

    cancelSelectionBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.displaySelected).toBeFalse();
  });

  it('should click row (room in table)', () => {
    const testRoom: Room = {
      id: 0,
      number: '1212',
      type: 'common',
      price: 0,
      extras: 'nope',
      available: true,
      imgURL: '---',
    };
    component.clickedRow(testRoom);
    expect(component.selectedRoom).toBe(testRoom);
  });

  it('should submit', () => {
    const testBooking: BookRoom = {
      clientName: 'ClientName',
      checkin: new Date('09/24/2023'),
      checkout: new Date('09/25/2023'),
      price: 1000,
      roomId: 0,
      notes: 'nope',
    };
    const submitBtn = debugElement.query(By.css('[data-testid="submit-btn"]'));
    const submitForm = debugElement.query(
      By.css('[data-testid="submit-form"]')
    );

    component.addBookingForm.patchValue({
      clientName: testBooking.clientName,
      roomId: testBooking.roomId,
      roomType: 'common',
      checkin: testBooking.checkin,
      checkout: testBooking.checkout,
      notes: testBooking.notes,
    });

    // expect(component.addBookingForm.valid).toBeTrue();
    // submitForm.triggerEventHandler('submit',null);
    // const formDirective:FormGroupDirective=new FormGroupDirective()
    // component.onSubmit(formDirective)
    addBookingServiceSpy.createBooking.and.returnValue(of('Booking Created'));

    // component.onSubmit()
    // submitBtn.triggerEventHandler('click',null)
    submitForm.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    // fixture.detectChanges();
    expect(addBookingServiceSpy.createBooking.calls.count()).toBe(1);
  });

  it('should create booking - Error', () => {
    const testBooking: BookRoom = {
      clientName: 'ClientName',
      checkin: new Date('09/24/2023'),
      checkout: new Date('09/25/2023'),
      price: 1000,
      roomId: 0,
      notes: 'nope',
    };
    const testMsg = {
      status: 404,
      message: `Room with ID: ${testBooking.roomId} not found.`,
    };
    const submitForm = debugElement.query(
      By.css('[data-testid="submit-form"]')
    );

    addBookingServiceSpy.createBooking.and.returnValue;
    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: `Room with ID: ${testBooking.roomId} not found.`,
    });

    addBookingServiceSpy.createBooking.and.returnValue(
      throwError(() => errorResponse)
    );
    submitForm.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(addBookingServiceSpy.createBooking.calls.count()).toBe(1);
  });

  it('should retrieve rooms by type',()=>{
    const type = 'common'
    const testRooms: Room[] = [{
      id: 0,
      number: '1212',
      type: 'common',
      price: 0,
      extras: 'nope',
      available: true,
      imgURL: '---',
    }]

    roomServiceSpy.getRoomByType.and.returnValue(of(testRooms))
    component.addBookingForm.controls['roomType'].setValue(type)
    component.retrieveRoomsByType()
    expect(component.rooms).toBe(testRooms)
  })


  it('should retrieve rooms by type - Error',()=>{
    const type = 'common';
    const testMsg = {
      status: 404,
      message: `No ${type} rooms.`,
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });

    roomServiceSpy.getRoomByType.and.returnValue(
      throwError(() => errorResponse)
    );
    component.addBookingForm.controls['roomType'].setValue(type)
    component.retrieveRoomsByType()
     expect(roomServiceSpy.getRoomByType.calls.count()).toBe(1);
  })

});
