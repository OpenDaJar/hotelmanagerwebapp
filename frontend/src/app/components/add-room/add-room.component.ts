import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Room } from '../../models/room.model';
import { AddRoomService } from './services/add-room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
})
export class AddRoomComponent implements OnInit {
  room?: Room;
  addRoomForm!: FormGroup;
  errorMessage ="";
  roomAdded=false;
  roomAddedFailed=false;

  constructor(private fb: FormBuilder, private addRoomService:AddRoomService) {}

  ngOnInit(): void {
    this.addRoomForm = this.fb.group({
      number: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      type: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      price: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      extras: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  onSubmit(): void {
    console.log(this.addRoomForm.value);
    this.room = {
      number: this.addRoomForm.get('number')?.value,
      type: this.addRoomForm.get('type')?.value,
      price: this.addRoomForm.get('price')?.value,
      extras: this.addRoomForm.get('extras')?.value,
    };
    this.addRoomService.createRoom(this.room).subscribe({
      next: (res) => {
        console.log(res);
        this.roomAdded=true;
      },
      error: (e) => {
        console.error(e)
        this.errorMessage = e;
        this.roomAddedFailed = true;
      }
    });

  }
}
