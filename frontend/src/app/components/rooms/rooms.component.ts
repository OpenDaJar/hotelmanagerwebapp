import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room.model';
import { RoomService } from './services/room.service';
import { MatDialog ,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[]=[{}];
  room: Room = {};
  message = '';
  tableCols?: string[] = ['number', 'type', 'price', 'extras', 'available','edit','delete'];

  // constructor(private roomService: RoomService,private dialog: MatDialog) {}
  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.retrieveAllRooms();
  }

  retrieveAllRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.rooms = data;
        console.log(this.rooms);
      },
      error: (e) => console.error(e),
    });
  }

  retrieveRoom(id: any): void {
    this.roomService.getRoom(id).subscribe({
      next: (data) => {
        this.room = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }

  updateRoom(id: any): void {
    //for testing
    // this.retrieveRoom(id)

    const data = {
      number: this.room?.number,
      type: this.room?.type,
      price: this.room?.price,
      extras: this.room?.extras,
      available: this.room?.available,
    };
    this.message = '';

    this.roomService.updateRoom(id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This tutorial was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  clickedRow(row:Room):void{
    console.log(row);
  }

  clickedEdit(room:Room):void{
    console.log("clicked Edit",room.id);
    // this.openDialog();

  }

  clickedRemove(room:Room):void{
    console.log("clicked Remove",room.id)
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(RoomDialogComponent, {
  //     data: {name: "this.name", animal: "this.animal"},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // this.animal = result;
  //   });
  // }
}
