import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './_shared/authguard.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/register/register.module').then(
        (m) => m.RegisterModule
      ),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'add-room',
    loadChildren: () =>
      import('./components/add-room/add-room.module').then(
        (m) => m.AddRoomModule
      ),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'rooms',
    loadChildren: () =>
      import('./components/rooms/rooms.module').then((m) => m.RoomsModule),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'add-booking',
    loadChildren: () =>
      import('./components/add-booking/add-booking.module').then(
        (m) => m.AddBookingModule
      ),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./components/bookings/bookings.module').then(
        (m) => m.BookingsModule
      ),
    canActivate: [AuthguardGuard],
  },
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
