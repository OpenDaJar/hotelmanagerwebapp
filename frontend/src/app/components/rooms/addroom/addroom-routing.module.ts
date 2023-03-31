import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddroomComponent } from './addroom.component';

const routes: Routes = [{ path: '', component: AddroomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddroomRoutingModule { }
