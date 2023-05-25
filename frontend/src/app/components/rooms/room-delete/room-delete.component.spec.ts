import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDeleteComponent } from './room-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

describe('RoomDeleteComponent', () => {
  let component: RoomDeleteComponent;
  let fixture: ComponentFixture<RoomDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomDeleteComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
