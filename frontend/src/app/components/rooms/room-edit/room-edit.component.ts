import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService } from '../services/room.service';
import { Room } from 'src/app/models/room.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss'],
})
export class RoomEditComponent implements OnInit {
  message!: string;
  updateRoomForm!: FormGroup;
  errorMessage = '';
  roomUpdateFailed = false;
  @Output() updatedEvent = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private room: Room,
    private roomService: RoomService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.updateRoomForm = this.fb.group({
      number: new FormControl(this.room.number, {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      type: new FormControl(this.room.type, {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      price: new FormControl(this.room.price, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      extras: new FormControl(this.room.extras, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  onSubmit(): void {
    console.log(this.updateRoomForm.value);
    this.room = {
      id: this.room.id,
      number: this.updateRoomForm.get('number')?.value,
      type: this.updateRoomForm.get('type')?.value,
      price: this.updateRoomForm.get('price')?.value,
      extras: this.updateRoomForm.get('extras')?.value,
    };
    console.log('ROOM ID: ', this.room.id);
    this.updateRoom(this.room.id);
  }

  updateRoom(id: any): void {
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
          : 'This Room was updated successfully!';
      },
      complete: () => {
        console.log('Room updates->refresh');
        this.updatedItem();
      },
      error: (e) => console.error(e),
    });
  }
  updatedItem() {
    this.updatedEvent.emit();
  }
}
