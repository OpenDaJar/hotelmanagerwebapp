import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddroomRoutingModule } from './addroom-routing.module';
import { AddroomComponent } from './addroom.component';


@NgModule({
  declarations: [
    AddroomComponent
  ],
  imports: [
    CommonModule,
    AddroomRoutingModule
  ]
})
export class AddroomModule { }
