import { TestBed } from '@angular/core/testing';

import { AddRoomService } from './add-room.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Room } from 'src/app/models/room.model';
import { HttpErrorResponse } from '@angular/common/http';

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

  it('should add Room API', () => {
    const testData: Room = {
      number: 'testNumber',
      type: 'common',
      price: 1222,
      extras: 'extras',
      imgURL: 'imgURL',
    };
    const testMsg = { status: 200, message: 'Room Created' };
    addRoomService.createRoom(testData).subscribe((res) => {
      expect(res).toEqual(testMsg);
    });
    const req = httpTestingController.expectOne(API_URL + '/addroom');
    expect(req.request.method).toEqual('POST');
    req.flush(testMsg);
    httpTestingController.verify();
  });

  it(' should return error status: 400', () => {
    const testRoom: Room = {
      number: 'testNumber',
      price: 1222,
      extras: 'extras',
      imgURL: 'imgURL',
    };
    const emsg = {
      status: 400,
      message: 'No Room type.',
    };
    // addRoomService.createRoom(testRoom).subscribe(
    //   () => {
    //     fail('next handler must not be called');
    //   },
    //   (error: HttpErrorResponse) => {
    //     expect(error.status).toEqual(emsg.status);
    //     expect(error.error).toEqual(emsg.message);
    //   },
    //   () => {
    //     fail('complete handler must not be called');
    //   }
    // );
    addRoomService.createRoom(testRoom).subscribe({
      error: (e: HttpErrorResponse) => {
        expect(e.status).toEqual(emsg.status);
        expect(e.error).toEqual(emsg.message);
      },
    });

    const req = httpTestingController.expectOne(API_URL + '/addroom');
    expect(req.request.method).toEqual('POST');
    req.flush(emsg.message, { status: emsg.status, statusText: emsg.message });
    httpTestingController.verify();
  });
});
