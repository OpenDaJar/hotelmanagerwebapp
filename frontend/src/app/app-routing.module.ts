import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },

  {
    path: 'rooms',
    loadChildren: () =>
      import('./components/rooms/rooms.module').then((m) => m.RoomsModule),
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./components/bookings/bookings.module').then(
        (m) => m.BookingsModule
      ),
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
