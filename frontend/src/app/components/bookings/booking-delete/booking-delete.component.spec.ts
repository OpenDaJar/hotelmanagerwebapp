import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDeleteComponent } from './booking-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { BookingssService } from '../services/bookingss.service';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('BookingDeleteComponent', () => {
  let component: BookingDeleteComponent;
  let fixture: ComponentFixture<BookingDeleteComponent>;
  let debugElement: DebugElement;

  let bookingServiceSpy: { deleteBooking: jasmine.Spy };

  beforeEach(async () => {
    bookingServiceSpy = jasmine.createSpyObj('BookingssService', [
      'deleteBooking',
    ]);
    await TestBed.configureTestingModule({
      declarations: [BookingDeleteComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: BookingssService, useValue: bookingServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete booking - 200', () => {
    const id = 1;
    const testMsg = {
      status: 400,
      message: `Booking with ID:${id} deleted successfully!`,
    };
    const deleteBtn = debugElement.query(
      By.css('[data-testid="submit-deletion-btn"]')
    );
    bookingServiceSpy.deleteBooking.and.returnValue(of(testMsg.message));
    deleteBtn.triggerEventHandler('click');
    expect(bookingServiceSpy.deleteBooking).toHaveBeenCalled();
  });

  it('should delete booking - 404', () => {
    const id = 1;
    const testMsg = {
      status: 404,
      message: `No booking with ID:${id} found for deletion.`,
    };
    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });
    const deleteBtn = debugElement.query(
      By.css('[data-testid="submit-deletion-btn"]')
    );
    bookingServiceSpy.deleteBooking.and.returnValue(
      throwError(() => errorResponse)
    );

    deleteBtn.triggerEventHandler('click');
    expect(bookingServiceSpy.deleteBooking).toHaveBeenCalled();
  });
});
