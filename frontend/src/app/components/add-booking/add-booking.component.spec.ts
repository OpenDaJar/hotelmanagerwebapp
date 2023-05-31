import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingComponent } from './add-booking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBookingService } from './services/add-booking.service';
import { RoomService } from '../rooms/services/room.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { throwError } from 'rxjs'

describe('AddBookingComponent', () => {
  let component: AddBookingComponent;
  let fixture: ComponentFixture<AddBookingComponent>;
  let roomServiceSpy:RoomService
  let testRooms: Room[] = [
    {
      id: 0,
      number: '1212',
      type: 'common',
      price: 0,
      extras: 'nope',
      available: true,
      imgURL: '---',
    },
    {
      id: 0,
      number: '1212',
      type: 'common',
      price: 0,
      extras: 'nope',
      available: true,
      imgURL: '---',
    },
  ];

  beforeEach(async () => {
    //fake service values
    //addBookingService
    const addBookingServiceSpy = jasmine.createSpyObj<AddBookingService>([
      'createBooking',
    ])

    //RoomService
    roomServiceSpy = jasmine.createSpyObj<RoomService>([
      'getRoomByType'
    ])

    // roomServiceSpy.getRoomByType.and.returnValue(of(testRooms))
    // roomServiceSpy.getRoomByType.and.throwError("error 404")


    //TestBed
    await TestBed.configureTestingModule({
      declarations: [AddBookingComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: AddBookingService, useValue: addBookingServiceSpy },
        { provide: RoomService, useValue: roomServiceSpy },
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve rooms by type',()=>{
    const type='common'
    component.addBookingForm.controls['roomType'].setValue(type);
    component.retrieveRoomsByType()
    expect(component.displayRooms).toBeTrue();
  })

  it('error',()=>{
    // const roomServices:RoomService = TestBed.inject(RoomService)

    let errorResponse = new Error('getRoomByType Error');
    // component.addBookingForm.controls['roomType'].setValue('nope');

    // roomServices.getRoomByType('nope').subscribe(
    //   () => {},
    // error => {
    //   expect(error).toEqual(errorResponse)
    // })


    roomServiceSpy.getRoomByType('nope').subscribe({
      next:()=>{},
      error:(e)=>{
        console.log("ERROR")
        expect(e).toThrow()
      }
    })

    expect('').toEqual('')

    // let getQuoteSpy =
    // getQuoteSpy.and.returnValue(throwError(() => new Error('TwainService test failure')));


  })


});
