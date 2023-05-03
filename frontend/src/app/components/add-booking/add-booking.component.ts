import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookRoom } from 'src/app/models/book-room.model';
import { AddBookingService } from './services/add-booking.service';
import { RoomService } from '../rooms/services/room.service';
import { Room } from 'src/app/models/room.model';
import { roomTypes } from 'src/app/globals';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss'],
})
export class AddBookingComponent implements OnInit {
  booking?: BookRoom;
  rooms: Room[] = [{}];
  roomTypes: string[] = roomTypes;
  addBookingForm!: FormGroup;
  errorMeesage = '';
  bookingAdded = false;
  bookingAddedFailed = false;

  constructor(
    private fb: FormBuilder,
    private addBookingService: AddBookingService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  //Get Rooms with "type"
  retrieveRoomsByType(): void {
    const type = this.addBookingForm.get("roomType")?.value
    this.roomService.getRoomByType(type).subscribe({
      next: (data) => {
        this.rooms = data;
      },
      error: (e) => console.error(e),
    });
  }

  //Create Form
  createForm(): void {
    this.addBookingForm = this.fb.group({
      clientName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      roomId: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      roomType: new FormControl('', {
        validators: [Validators.required],
      }),
      checkin: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      checkout: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      price: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  //submit data and refresh page when done
  onSubmit(): void {
    console.log(this.addBookingForm.value);
    // this.booking = {
    //   clientName: this.addBookingForm.get('clientName')?.value,
    //   checkin: this.addBookingForm.get('checkin')?.value,
    //   checkout: this.addBookingForm.get('checkout')?.value,
    //   price: this.addBookingForm.get('price')?.value,
    //   notes: this.addBookingForm.get('notes')?.value,
    //   roomId: this.addBookingForm.get('roomId')?.value,
    // };

    // this.addBookingService.createBooking(this.booking).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.bookingAdded = true;
    //   },
    //   complete: () => {
    //     this.refreshPage();
    //   },
    //   error: (e) => {
    //     console.log(e);
    //     this.errorMeesage = e.error.message;
    //     this.bookingAddedFailed = true;
    //   },
    // });
  }

  //refresh page
  refreshPage(): void {
    console.log('refreshing page');
  }

}
