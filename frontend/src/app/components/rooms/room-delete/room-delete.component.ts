import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-delete',
  templateUrl: './room-delete.component.html',
  styleUrls: ['./room-delete.component.scss'],
})
export class RoomDeleteComponent {
  message: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) protected roomID: any,
    private roomService: RoomService
  ) {}

  deleteRoom(): void {
    console.log('DeletetingRoom');
    this.roomService.deleteRoom(this.roomID).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This Room was deleted successfully!';
      },
      error: (e) => console.error(e),
    });
  }
}
