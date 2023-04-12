import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBookingRoutingModule } from './add-booking-routing.module';
import { AddBookingComponent } from './add-booking.component';


@NgModule({
  declarations: [
    AddBookingComponent
  ],
  imports: [
    CommonModule,
    AddBookingRoutingModule
  ]
})
export class AddBookingModule { }
