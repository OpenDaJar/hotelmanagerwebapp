import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsComponent } from './bookings.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';

describe('BookingsComponent', () => {
  let component: BookingsComponent;
  let fixture: ComponentFixture<BookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingsComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: MatDialog, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
