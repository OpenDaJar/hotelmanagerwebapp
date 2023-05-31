import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AddRoomComponent } from './add-room.component';
import { AddRoomService } from './services/add-room.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

describe('AddRoomComponent', () => {
  let component: AddRoomComponent;
  let fixture: ComponentFixture<AddRoomComponent>;
  let addRoomServiceSpy: AddRoomService;
  let msg = { message: 'test' };
  beforeEach(async () => {
    addRoomServiceSpy = jasmine.createSpyObj<AddRoomService>('AddRoomService', {
      createRoom: of(msg),
    });

    await TestBed.configureTestingModule({
      declarations: [AddRoomComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AddRoomService, useValue: addRoomServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit room', () => {
    const myWindow = {
      location: {
        reload() {
          return 'something';
        },
      },
    };
    component.addRoomForm.controls['number'].setValue('test');
    component.addRoomForm.controls['type'].setValue('common');
    component.addRoomForm.controls['price'].setValue(1234);
    component.addRoomForm.controls['extras'].setValue('nope');
    msg.message = 'Room Added';
    component.compWindow = myWindow;
    component.onSubmit();
    expect(component.roomAdded).toBeTrue();
  });

  // it('should throw error -> createRoom', fakeAsync((done: DoneFn) => {
  //   let errorMsg="aaaaa";
  //   // addRoomServiceSpy.createRoom("").subscribe(
  //   //   () => {
  //   //     fail('next handler must not be called');
  //   //   },
  //   //   (error)=> {
  //   //     console.log("aRASA")
  //   //     errorMsg = "ERROR"
  //   //   },
  //   //   () => {
  //   //     fail('complete handler must not be called');
  //   //   },
  //   // );

  //   // addRoomServiceSpy.createRoom('').subscribe({
  //   //   next:()=>{
  //   //     // done.fail
  //   //   },
  //   //   error:(e)=>{
  //   //     console.log("AAA")
  //   //     // done()
  //   //   }
  //   // })

  //   // spyOn(addRoomServiceSpy , 'createRoom').and.callFake(() => {
  //   //   return throwError(new Error('Fake error'));
  //   // });
  //   // spyOn(addRoomServiceSpy, 'createRoom').and.returnValue(Observable.throw('error'))

  //   console.log("AA",errorMsg)
  //   console.log("aa")
  //   expect('aa').toEqual("aa")



  // }));
});
