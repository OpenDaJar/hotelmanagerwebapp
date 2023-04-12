import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit{

  addRoomForm!: FormGroup;

  constructor(private fb: FormBuilder){}

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
    })


  }

  onSubmit():void{
    console.log(this.addRoomForm.value)
  }

}
