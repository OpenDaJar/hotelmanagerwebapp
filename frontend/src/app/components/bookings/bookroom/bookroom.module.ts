import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookroomRoutingModule } from './bookroom-routing.module';
import { BookroomComponent } from './bookroom.component';


@NgModule({
  declarations: [
    BookroomComponent
  ],
  imports: [
    CommonModule,
    BookroomRoutingModule
  ]
})
export class BookroomModule { }
