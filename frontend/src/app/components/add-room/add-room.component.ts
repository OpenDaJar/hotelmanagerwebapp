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
  imageReset = false;


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
      imgURL: this.imgURL,
    };
    this.addRoomService.createRoom(this.room).subscribe({
      next: (res) => {
        console.log(res);
        this.roomAdded = true;
        this.resetForm()
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

  resetForm(): void {
    console.log('reset form');
    this.addRoomForm.reset()
    this.addRoomForm.controls['number'].setErrors(null)
    this.addRoomForm.controls['type'].setErrors(null)
    this.addRoomForm.controls['price'].setErrors(null)
    this.addRoomForm.controls['extras'].setErrors(null)
    this.imageReset = !this.imageReset;
    setTimeout(() => {
      this.imageReset = !this.imageReset;
    }, 10);
    this.roomAddedFailed=false
    this.roomAdded = false
  }

  clearValue(key: string): void {
    this.addRoomForm.controls[key].setValue('');
  }

  getImageURL(imgURLEvent: string) {
    this.imgURL = imgURLEvent;
  }
}
