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
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule) },
  { path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'admin', loadChildren: () => import('./components/board-admin/board-admin.module').then(m => m.BoardAdminModule) },
  { path: 'mod', loadChildren: () => import('./components/board-mod/board-mod.module').then(m => m.BoardModModule) },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
