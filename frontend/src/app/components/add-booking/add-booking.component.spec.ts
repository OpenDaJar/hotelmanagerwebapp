import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingComponent } from './add-booking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBookingService } from './services/add-booking.service';
import { RoomService } from '../rooms/services/room.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('AddBookingComponent', () => {
  let component: AddBookingComponent;
  let fixture: ComponentFixture<AddBookingComponent>;

  beforeEach(async () => {
    //fake service values
    //addBookingService
    const addBookingServiceSpy = jasmine.createSpyObj<AddBookingService>([
      'createBooking',
    ])

    //RoomService
    const roomServiceSpy = jasmine.createSpyObj<RoomService>([
      'getRoomByType',
    ])

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
});
