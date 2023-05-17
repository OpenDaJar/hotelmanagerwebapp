import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingComponent } from './add-booking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddBookingComponent', () => {
  let component: AddBookingComponent;
  let fixture: ComponentFixture<AddBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ AddBookingComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
