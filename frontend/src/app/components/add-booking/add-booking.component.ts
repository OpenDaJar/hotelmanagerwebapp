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
  selectedRoom?: Room;
  rooms: Room[] = [{}];
  roomTypes: string[] = roomTypes;
  addBookingForm!: FormGroup;
  errorMeesage = '';
  bookingAdded = false;
  bookingAddedFailed = false;
  displayRooms = false;
  displaySelected = false;
  tableCols?: string[] = ['number', 'price', 'extras'];
  bookingPrice = 0;

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
    console.log('called');
    const type = this.addBookingForm.get('roomType')?.value;
    if (type != '') {
      this.roomService.getRoomByType(type).subscribe({
        next: (data) => {
          this.rooms = data;
        },
        error: (e) => console.error(e),
      });
      this.displayRooms = true;
      this.displaySelected = false;
    }
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
      // price: new FormControl({value:0, disabled: true}, {
      //   validators: [Validators.required],
      //   updateOn: 'blur',
      // }),
      notes: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  //submit data and refresh page when done
  onSubmit(): void {
    this.bookingPriceCalc();

    const checkin = this.addBookingForm
      .get('checkin')
      ?.value.toDate()
      .toLocaleDateString();
    const checkout = this.addBookingForm
      .get('checkout')
      ?.value.toDate()
      .toLocaleDateString();

    // const date = this.addBookingForm.get("checkin")?.value.toDate()
    // const dateSp= String(date).split(" ", 4)
    // dateSp.shift()
    // console.log("DATE:",  dateSp.join(" ") )

    this.booking = {
      clientName: this.addBookingForm.get('clientName')?.value,
      checkin: checkin,
      checkout: checkout,
      price: this.bookingPrice,
      notes: this.addBookingForm.get('notes')?.value,
      roomId: this.selectedRoom?.id,
    };
    console.log(this.booking);

    this.addBookingService.createBooking(this.booking).subscribe({
      next: (res) => {
        console.log(res);
        this.bookingAdded = true;
      },
      complete: () => {
        this.refreshPage();
      },
      error: (e) => {
        console.log(e);
        this.errorMeesage = e.error.message;
        this.bookingAddedFailed = true;
      },
    });
  }

  //refresh page
  refreshPage(): void {
    console.log('refreshing page');
  }

  //clicked row and disable roomTypes selection
  clickedRow(row: Room): void {
    this.selectedRoom = row;
    this.rooms = [this.selectedRoom];
    this.displaySelected = true;
    this.addBookingForm.controls['roomId'].setValue(this.selectedRoom.id);
  }

  //return roomTypes selection
  cancelSelection(): void {
    this.displaySelected = false;
    this.displayRooms = false;
    this.addBookingForm.controls['roomType'].reset();
    this.bookingPrice = 0;
    this.addBookingForm.controls['roomId'].setValue('');
  }

  //booking price calculator
  bookingPriceCalc(): void {
    let roomRate = this.selectedRoom?.price;
    if (roomRate == undefined) roomRate = 0;

    let days =
      (this.addBookingForm.get('checkout')?.value.toDate() -
        this.addBookingForm.get('checkin')?.value.toDate()) /
      (24 * 60 * 60 * 1000);
    if (days == undefined) days = 0;

    let price = 0;
    if (roomRate != undefined) {
      price = roomRate * days;
    }

    console.log(`Room RAte: ${roomRate}, Days: ${days}, total:${price}`);
    this.bookingPrice = price;
  }
}
