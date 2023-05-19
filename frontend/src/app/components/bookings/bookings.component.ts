import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BookRoom } from 'src/app/models/book-room.model';
import { Room } from 'src/app/models/room.model';
import { BookingssService } from './services/bookingss.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingDeleteComponent } from './booking-delete/booking-delete.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class BookingsComponent implements OnInit, AfterViewInit {
  bookings: BookRoom[] = [];
  rooms: Room[] = [];
  room: Room = {};
  testArray = [{}];
  columnsToDisplay = [
    'clientName',
    'roomNumber',
    'notes',
    'price',
    'checkin',
    'checkout',
    'delete',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Room | null;

  constructor(
    private bookingService: BookingssService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.retrieveAllBookings();
  }
  ngAfterViewInit(): void {}
  fillArray(): void {
    this.bookings.forEach((booking) => {
      const room = this.rooms.find((room) => room.id == booking.roomId);
      if (room != undefined)
        this.testArray.push({
          id: booking.id,
          roomNum: room.number,
        });
    });
  }
  retrieveAllBookings(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        console.log(this.bookings);
      },
      complete: () => {
        console.log('Retrieving Bookings Completed');
        this.getRooms();
      },
      error: (e) => console.error(e),
    });
  }

  getRooms() {
    this.bookings.forEach((booking) => {
      this.bookingService.getRoom(booking.roomId).subscribe({
        next: (data) => {
          this.rooms.push(data);
          console.log(data);
        },
        error: (e) => console.error(e),
      });
    });
  }

  getRoomNumber(roomId: number) {
    return this.rooms.find((room) => room.id == roomId)?.number;
  }

  getRoom(id: number) {
    this.bookingService.getRoom(id).subscribe({
      next: (data) => {
        this.room = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  test(id: any) {
    console.log('test', id);
    this.getRoom(id.roomId);
  }

  clickedRemove(id: number): void {
    console.log('Clicked Remove booking with ID:', id);
    this.dialog.open(BookingDeleteComponent, {
      data: id,
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.retrieveAllBookings();
    });
  }
}
