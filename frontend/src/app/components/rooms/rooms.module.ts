import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    RoomsComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class RoomsModule { }
