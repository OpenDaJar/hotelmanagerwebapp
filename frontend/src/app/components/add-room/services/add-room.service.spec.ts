import { TestBed } from '@angular/core/testing';

import { AddRoomService } from './add-room.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Room } from 'src/app/models/room.model';

describe('AddRoomService', () => {
  const API_URL = 'http://localhost:6868/api/rooms';
  let addRoomService: AddRoomService;
  let httpClient: HttpClientTestingModule;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddRoomService],
    });
    addRoomService = TestBed.inject(AddRoomService);
    httpClient = TestBed.inject(HttpClientTestingModule);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(addRoomService).toBeTruthy();
  });

  it('add Room API', () => {
    const testData: Room = {
      number: 'testNumber',
      type: 'common',
      price: 1222,
      extras: 'extras',
      imgURL: 'imgURL',
    };
    const testMsg = { message: 'Room Created' };
    addRoomService.createRoom(testData).subscribe((data) => {
      expect(data).toEqual(testMsg);
    });
    const req = httpTestingController.expectOne(API_URL + '/addroom');
    expect(req.request.method).toEqual('POST');
    req.flush(testMsg);
    httpTestingController.verify();
  });
});
