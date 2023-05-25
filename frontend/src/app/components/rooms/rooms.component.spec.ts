import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RoomService } from './services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadImagesService } from '../upload-images/services/upload-images.service';
import { of } from 'rxjs';
import { Room } from 'src/app/models/room.model';
import { MatTableModule } from '@angular/material/table';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;
  let testRooms: Room[] = [
    {
      id: 0,
      number: '1212',
      type: 'common',
      price: 0,
      extras: 'nope',
      available: true,
      imgURL: '---',
    },
    {
      id: 0,
      number: '1212',
      type: 'common',
      price: 0,
      extras: 'nope',
      available: true,
      imgURL: '---',
    },
  ];

  beforeEach(async () => {
    //fake services values
    //RoomService
    const roomServiceSpy = jasmine.createSpyObj<RoomService>([
      'getAllRooms',
      'getRoom',
    ]);
    roomServiceSpy.getAllRooms.and.returnValue(of(testRooms));
    roomServiceSpy.getRoom.and.returnValue(of(testRooms[0]));

    //TestBed
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule],
      declarations: [RoomsComponent],
      providers: [
        { provide: RoomService, useValue: roomServiceSpy },
        { provide: MatDialog, useValue: {} },
        { provide: UploadImagesService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrieve all Rooms', () => {
    component.retrieveAllRooms();
    expect(component.rooms.length).toBe(2);
  });

});
