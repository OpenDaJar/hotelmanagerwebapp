import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoomRoutingModule } from './add-room-routing.module';
import { AddRoomComponent } from './add-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    AddRoomComponent
  ],
  imports: [
    CommonModule,
    AddRoomRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ]
})
export class AddRoomModule { }
