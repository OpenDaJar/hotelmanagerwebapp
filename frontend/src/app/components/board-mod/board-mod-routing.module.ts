import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardModComponent } from './board-mod.component';

const routes: Routes = [{ path: '', component: BoardModComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardModRoutingModule { }
