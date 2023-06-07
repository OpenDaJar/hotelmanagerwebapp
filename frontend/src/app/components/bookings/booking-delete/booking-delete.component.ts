import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingssService } from '../services/bookingss.service';

@Component({
  selector: 'app-booking-delete',
  templateUrl: './booking-delete.component.html',
  styleUrls: ['./booking-delete.component.scss'],
})
export class BookingDeleteComponent {
  message: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) protected bookingId: number,
    private bookingService: BookingssService
  ) {}

  deleteBooking(): void {
    console.log('DeletetingRoom');
    this.bookingService.deleteBooking(this.bookingId).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
      },
      error: (e) => console.error(e),
    });
  }
}
