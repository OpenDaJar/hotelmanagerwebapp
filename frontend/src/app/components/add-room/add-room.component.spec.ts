import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomComponent } from './add-room.component';
import { AddRoomService } from './services/add-room.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Room } from 'src/app/models/room.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('AddRoomComponent', () => {
  let component: AddRoomComponent;
  let fixture: ComponentFixture<AddRoomComponent>;
  let debugElement: DebugElement;
  // let addRoomServiceSpy: AddRoomService;
  // let msg = { message: 'test' };
  let addRoomServiceSpy: { createRoom: jasmine.Spy };

  beforeEach(async () => {
    // addRoomServiceSpy = jasmine.createSpyObj<AddRoomService>('AddRoomService', {
    //   createRoom: of(msg),
    // });
    addRoomServiceSpy = jasmine.createSpyObj('AddRoomService', ['createRoom']);

    await TestBed.configureTestingModule({
      declarations: [AddRoomComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AddRoomService, useValue: addRoomServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form', () => {
    const testRoom: Room = {
      number: '1212',
      type: 'common',
      price: 0,
      extras: 'nope',
      imgURL: '---',
    };

    const submitForm = debugElement.query(
      By.css('[data-testid="submit-form"]')
    );

    component.addRoomForm.patchValue({
      number:testRoom.number,
      type:testRoom.type,
      price:testRoom.price,
      imgURL:testRoom.imgURL,
    })
    addRoomServiceSpy.createRoom.and.returnValue(of('Room Added'))

    submitForm.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(addRoomServiceSpy.createRoom.calls.count()).toBe(1)
  });

  it('should create room - Error',()=>{
    const testRoom: Room = {
      number: '1212',
      type: undefined,
      price: 0,
      extras: 'nope',
      imgURL: '---',
    };

    const testMsg = {
      status: 404,
      message: "No Room type.",
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });
    const submitForm = debugElement.query(
      By.css('[data-testid="submit-form"]')
    );

    addRoomServiceSpy.createRoom.and.returnValue(throwError(()=>errorResponse))
    submitForm.triggerEventHandler('ngSubmit',null)
    fixture.detectChanges();
    expect(addRoomServiceSpy.createRoom.calls.count()).toBe(1);
  })

  it('should clear form field value',()=>{

    const testControls = ['number','price','extras']

    testControls.forEach((control)=>{
      component.addRoomForm.controls[control].setValue(101)
      component.clearValue(control)
      expect(component.addRoomForm.controls[control].value).toBe("")
    })
  })

  it('should get image URL',()=>{
    const testUrl = "after test"
    component.imgURL = "before test"
    component.getImageURL(testUrl)
    expect(component.imgURL).toBe(testUrl)
  })

  // it('should submit room', () => {
  //   const myWindow = {
  //     location: {
  //       reload() {
  //         return 'something';
  //       },
  //     },
  //   };
  //   component.addRoomForm.controls['number'].setValue('test');
  //   component.addRoomForm.controls['type'].setValue('common');
  //   component.addRoomForm.controls['price'].setValue(1234);
  //   component.addRoomForm.controls['extras'].setValue('nope');
  //   msg.message = 'Room Added';
  //   component.compWindow = myWindow;
  //   component.onSubmit();
  //   expect(component.roomAdded).toBeTrue();
  // });

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
