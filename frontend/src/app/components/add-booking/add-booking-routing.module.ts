import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingComponent } from './add-booking.component';

const routes: Routes = [{ path: '', component: AddBookingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBookingRoutingModule {}
