import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardModRoutingModule } from './board-mod-routing.module';
import { BoardModComponent } from './board-mod.component';


@NgModule({
  declarations: [
    BoardModComponent
  ],
  imports: [
    CommonModule,
    BoardModRoutingModule
  ]
})
export class BoardModModule { }
