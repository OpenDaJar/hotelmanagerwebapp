import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
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
  imgURL = '';
  compWindow: any;

  constructor(
    private fb: FormBuilder,
    private addRoomService: AddRoomService
  ) {
    this.compWindow = window;

  }

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
      imgURL: this.imgURL,
    };
    this.addRoomService.createRoom(this.room).subscribe({
      next: (res) => {
        console.log(res);
        this.roomAdded = true;
      },
      complete: () => {
        //reset form and errors
        console.log('Room Added');
        // formDirective.resetForm();
        // this.addRoomForm.reset();
        setTimeout(this.reloadPage, 500);
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

  clearValue(key: string): void {
    this.addRoomForm.controls[key].setValue('');
  }

  reloadPage(): void {
    this.compWindow.location.reload();
  }

  getImageURL(imgURLEvent: string) {
    this.imgURL = imgURLEvent;
  }
}
