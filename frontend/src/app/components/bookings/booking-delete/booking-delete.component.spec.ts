import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDeleteComponent } from './booking-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('BookingDeleteComponent', () => {
  let component: BookingDeleteComponent;
  let fixture: ComponentFixture<BookingDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
      imports:[HttpClientTestingModule],
      declarations: [ BookingDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
