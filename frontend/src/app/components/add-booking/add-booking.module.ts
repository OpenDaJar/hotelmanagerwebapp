import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBookingRoutingModule } from './add-booking-routing.module';
import { AddBookingComponent } from './add-booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AddBookingComponent],
  imports: [
    CommonModule,
    AddBookingRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatMomentDateModule,
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class AddBookingModule {}
