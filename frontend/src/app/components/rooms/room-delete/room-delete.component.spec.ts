import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDeleteComponent } from './room-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoomDeleteComponent', () => {
  let component: RoomDeleteComponent;
  let fixture: ComponentFixture<RoomDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RoomDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
