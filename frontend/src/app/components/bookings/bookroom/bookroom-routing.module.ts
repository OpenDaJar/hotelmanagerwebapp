import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookroomComponent } from './bookroom.component';

const routes: Routes = [{ path: '', component: BookroomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookroomRoutingModule { }
