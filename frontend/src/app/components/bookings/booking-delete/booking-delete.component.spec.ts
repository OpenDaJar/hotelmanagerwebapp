import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDeleteComponent } from './booking-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BookingDeleteComponent', () => {
  let component: BookingDeleteComponent;
  let fixture: ComponentFixture<BookingDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingDeleteComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
