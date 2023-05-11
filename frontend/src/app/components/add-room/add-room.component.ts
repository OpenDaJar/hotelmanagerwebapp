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
  errorMessage = '';
  roomAdded = false;
  roomAddedFailed = false;

  constructor(
    private fb: FormBuilder,
    private addRoomService: AddRoomService
  ) {}

  ngOnInit(): void {
    this.createForm();
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
        this.roomAdded = true;
      },
      complete: () => {
        //reset form and errors
        this.addRoomForm.reset();
        Object.keys(this.addRoomForm.controls).forEach((key) => {
          const control = this.addRoomForm.controls[key];
          control.setErrors(null);
      });
        // this.addRoomForm.controls['number'].setErrors(null)
        // this.addRoomForm.controls['type'].setErrors(null)
        // this.addRoomForm.controls['price'].setErrors(null)
        // this.addRoomForm.controls['extras'].setErrors(null)
      },
      error: (e) => {
        console.error(e);
        this.errorMessage = e.error.message;
        this.roomAddedFailed = true;
      },
    });

  }

  createForm(): void {
    this.addRoomForm = this.fb.group({
      number: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      type: new FormControl('', {
        validators: [Validators.required],
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
}
