import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';

const routes: Routes = [
  { path: '', component: RoomsComponent },
  {
    path: 'addroom',
    loadChildren: () =>
      import('./addroom/addroom.module').then((m) => m.AddroomModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
