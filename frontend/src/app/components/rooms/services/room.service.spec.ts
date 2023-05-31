import { TestBed } from '@angular/core/testing';

import { RoomService } from './room.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Room } from '../../../models/room.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

fdescribe('RoomService', () => {
  // const API_URL = 'http://localhost:6868/api/rooms';
  let roomService: RoomService;
  let httpClientSpy: {
    post: jasmine.Spy;
    get: jasmine.Spy;
    put: jasmine.Spy;
    delete: jasmine.Spy;
  };
  // let httpClient: HttpClientTestingModule;
  // let httpTestingController: HttpTestingController;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RoomService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    roomService = TestBed.inject(RoomService);
    // httpClient = TestBed.inject(HttpClientTestingModule);
    // httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(roomService).toBeTruthy();
  });

  it('should get all Rooms API - 200', (done: DoneFn) => {
    const testRooms: Room[] = [
      {
        id: 1,
        number: 'testNumber1',
        type: 'common',
        price: 111,
        extras: 'extras1',
        imgURL: 'imgURL1',
      },
      {
        id: 2,
        number: 'testNumber2',
        type: 'common',
        price: 222,
        extras: 'extras2',
        imgURL: 'imgURL2',
      },
    ];

    const testMsg = {
      status: 200,
      message: testRooms,
    };

    httpClientSpy.get.and.returnValue(of(testMsg.message));
    roomService.getAllRooms().subscribe({
      next: (res) => {
        expect(res).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should get all Rooms API - 404 no rooms found', (done: DoneFn) => {
    const testMsg = {
      status: 404,
      message: 'No rooms found.',
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: 'No rooms found.',
    });

    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
    roomService.getAllRooms().subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  // it('should get Room API - 200', (done: DoneFn) => {});
  // it('should get Room API - 404 no room found', (done: DoneFn) => {});

  // it('should update Room API - 200', (done: DoneFn) => {});
  // it('should update Room API - 404 no room found', (done: DoneFn) => {});
  // it('should delete Room API - 200', (done: DoneFn) => {});
  // it('should delete Room API - 404 no room found', (done: DoneFn) => {});

  // it('should get Room by type API - 200', (done: DoneFn) => {});
  // it('should get Room by type API - 404 no rooms for type', (done: DoneFn) => {});
});
