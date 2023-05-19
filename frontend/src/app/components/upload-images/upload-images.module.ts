import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImagesComponent } from './upload-images.component';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [UploadImagesComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatGridListModule,
  ],
  exports: [UploadImagesComponent],
})
export class UploadImagesModule {}
