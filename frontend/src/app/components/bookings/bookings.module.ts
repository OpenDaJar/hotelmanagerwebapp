import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsComponent } from './bookings.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BookingDeleteComponent } from './booking-delete/booking-delete.component';

@NgModule({
  declarations: [BookingsComponent, BookingDeleteComponent],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers:[]
})
export class BookingsModule {}
