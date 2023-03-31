import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './bookings.component';

const routes: Routes = [{ path: '', component: BookingsComponent }, { path: 'bookroom', loadChildren: () => import('./bookroom/bookroom.module').then(m => m.BookroomModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
