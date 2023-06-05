import { TestBed } from '@angular/core/testing';

import { AddRoomService } from './add-room.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Room } from 'src/app/models/room.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('AddRoomService', () => {
  // const API_URL = 'http://localhost:6868/api/rooms';
  let addRoomService: AddRoomService;
  let httpClientSpy: { post: jasmine.Spy };
  // let httpClient: HttpClientTestingModule;
  // let httpTestingController: HttpTestingController;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AddRoomService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    addRoomService = TestBed.inject(AddRoomService);
    // httpClient = TestBed.inject(HttpClientTestingModule);
    // httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(addRoomService).toBeTruthy();
  });

  it('should add Room - 200', (done: DoneFn) => {
    const testData: Room = {
      number: 'testNumber',
      type: 'common',
      price: 1222,
      extras: 'extras',
      imgURL: 'imgURL',
    };

    const testMsg = {
      status: 200,
      message: 'Room Created',
    };

    httpClientSpy.post.and.returnValue(of(testMsg.message));
    addRoomService.createRoom(testData).subscribe({
      next: (res) => {
        expect(res).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should add Room - 400',(done:DoneFn)=>{
    const testData: Room = {
      number: 'testNumber',
      type: undefined,
      price: 1222,
      extras: 'extras',
      imgURL: 'imgURL',
    };

    const testMsg = {
      status: 404,
      message: "No Room type.",
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });

    httpClientSpy.post.and.returnValue(throwError(()=>errorResponse))
    addRoomService.createRoom(testData).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);

  })

});
