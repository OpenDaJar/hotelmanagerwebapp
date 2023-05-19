import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoomRoutingModule } from './add-room-routing.module';
import { AddRoomComponent } from './add-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UploadImagesModule } from '../upload-images/upload-images.module';


@NgModule({
  declarations: [
    AddRoomComponent,
  ],
  imports: [
    CommonModule,
    AddRoomRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatProgressBarModule,
    UploadImagesModule
  ]
})
export class AddRoomModule { }
