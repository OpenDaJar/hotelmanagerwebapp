import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/board-admin/board-admin.module').then(
        (m) => m.BoardAdminModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'add-room',
    loadChildren: () =>
      import('./components/add-room/add-room.module').then(
        (m) => m.AddRoomModule
      ),
  },
  {
    path: 'rooms',
    loadChildren: () =>
      import('./components/rooms/rooms.module').then((m) => m.RoomsModule),
  },
  {
    path: 'add-booking',
    loadChildren: () =>
      import('./components/add-booking/add-booking.module').then(
        (m) => m.AddBookingModule
      ),
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./components/bookings/bookings.module').then(
        (m) => m.BookingsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
