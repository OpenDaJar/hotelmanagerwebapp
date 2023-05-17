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
import { UploadImageComponent } from './upload-image/upload-image.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AddRoomComponent,
    UploadImageComponent
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
    MatProgressBarModule
  ]
})
export class AddRoomModule { }
