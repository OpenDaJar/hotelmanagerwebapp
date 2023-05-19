import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room.model';
import { RoomService } from './services/room.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { RoomDeleteComponent } from './room-delete/room-delete.component';
import { UploadImagesService } from '../upload-images/services/upload-images.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  roomPicturesUrls = [{}];
  room: Room = {};
  message = '';
  tableCols?: string[] = [
    'picture',
    'number',
    'type',
    'price',
    'extras',
    'available',
    'edit',
    'delete',
  ];

  constructor(
    private roomService: RoomService,
    private dialog: MatDialog,
    private picService: UploadImagesService
  ) {}

  ngOnInit() {
    this.retrieveAllRooms();
  }

  getPictures(): void {
    this.rooms.forEach((room) => {
      this.picService.getFile('room-' + room.number).subscribe({
        next: (data) => {
          let key: string = room.number || 'a';
          this.roomPicturesUrls.push({
            [key]: data.url,
          });
        },
        error: (e) => console.error(e),
      });
    });
  }

  retrieveAllRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        console.log(this.rooms);
      },
      complete: () => {
        // this.getPictures();
      },
      error: (e) => console.error(e),
    });
  }
  //retrieve room with id and proceed to Editing Dialog
  retrieveRoom(id: any): void {
    this.roomService.getRoom(id).subscribe({
      next: (data) => {
        this.room = data;
        // console.log(data);
      },
      complete: () => {
        console.log('Retrieve Room: ', this.room);
        this.dialog.open(RoomEditComponent, {
          data: this.room,
        });
        this.dialog.afterAllClosed.subscribe(() => {
          this.retrieveAllRooms();
        });
      },
      error: (e) => console.log(e),
    });
  }

  clickedRow(row: Room): void {
    // console.log(row);
  }

  //Edit Button
  clickedEdit(id: any): void {
    console.log('clicked Edit', id);
    this.retrieveRoom(id);
  }

  //delete room
  clickedRemove(id: any): void {
    console.log('clicked Remove', id);
    this.dialog.open(RoomDeleteComponent, {
      data: id,
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.retrieveAllRooms();
    });
  }

  test() {
    console.log('TEST');
  }
  async displayImage(roomNumber: string): Promise<string> {
    let url = '';
    await this.roomService.getFile(roomNumber).subscribe({
      next: (data) => {
        url = data;
        console.log('URL: ', url);
      },
      error: (e) => console.error(e),
    });
    return url;
  }
}
