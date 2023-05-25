import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomComponent } from './add-room.component';
import { AddRoomService } from './services/add-room.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddRoomComponent', () => {
  let component: AddRoomComponent;
  let fixture: ComponentFixture<AddRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomComponent ],
      imports:[ReactiveFormsModule],
      providers:[{ provide: AddRoomService, useValue: {} },],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
