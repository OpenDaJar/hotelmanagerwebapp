import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RoomDeleteComponent } from './room-delete/room-delete.component';
import { UploadImagesModule } from '../upload-images/upload-images.module';

@NgModule({
  declarations: [RoomsComponent, RoomEditComponent, RoomDeleteComponent],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    UploadImagesModule,
  ],
})
export class RoomsModule {}
