import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditComponent } from './room-edit.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RoomService } from '../services/room.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('RoomEditComponent', () => {
  let component: RoomEditComponent;
  let fixture: ComponentFixture<RoomEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,MatDialogModule],
      declarations: [RoomEditComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
      {provide: RoomService, useValue:{}}],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
