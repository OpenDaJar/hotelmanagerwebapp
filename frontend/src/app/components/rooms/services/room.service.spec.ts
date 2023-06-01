import { TestBed } from '@angular/core/testing';

import { RoomService } from './room.service';
import { Room } from '../../../models/room.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('RoomService', () => {
  let roomService: RoomService;
  let httpClientSpy: {
    post: jasmine.Spy;
    get: jasmine.Spy;
    put: jasmine.Spy;
    delete: jasmine.Spy;
  };

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

  it('should get Room API - 200', (done: DoneFn) => {
    const id = 1;
    const testRoom: Room = {
      id: 1,
      number: 'testNumber1',
      type: 'common',
      price: 111,
      extras: 'extras1',
      imgURL: 'imgURL1',
    };
    const testMsg = {
      status: 200,
      message: testRoom,
    };
    httpClientSpy.get.and.returnValue(of(testMsg.message));
    roomService.getRoom(id).subscribe({
      next: (res) => {
        expect(res).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should get Room API - 404 no room found', (done: DoneFn) => {
    const id = 1;
    const testMsg = {
      status: 404,
      message: `Could not find room with ID:${id}`,
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });
    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
    roomService.getRoom(id).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should update Room API - 200', (done: DoneFn) => {
    const id = 1;
    const testRoom: Room = {
      number: 'testNumber1',
      type: 'common',
    };
    const testMsg = {
      status: 200,
      message: `Room with id=${id} was updated successfully.`,
    };
    httpClientSpy.put.and.returnValue(of(testMsg.message));
    roomService.updateRoom(id, testRoom).subscribe({
      next: (res) => {
        expect(res).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.put.calls.count()).toBe(1);
  });

  it('should update Room API - 404 no room found', (done: DoneFn) => {
    const id = 1;
    const testRoom: Room = {
      number: 'testNumber1',
      type: 'common',
    };

    const testMsg = { status: 404, message: `Room with id=${id} not found.` };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });

    httpClientSpy.put.and.returnValue(throwError(() => errorResponse));
    roomService.updateRoom(id, testRoom).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.put.calls.count()).toBe(1);
  });

  it('should delete Room API - 200', (done: DoneFn) => {
    const id = 1;
    const testMsg = {
      status: 200,
      message: `Room with id=${id} was deleted successfully.`,
    };
    httpClientSpy.delete.and.returnValue(of(testMsg.message));
    roomService.deleteRoom(id).subscribe({
      next: (res) => {
        expect(res).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.delete.calls.count()).toBe(1);
  });

  it('should delete Room API - 404 no room found', (done: DoneFn) => {
    const id = 1;
    const testMsg = {
      status: 404,
      message: `Room with id=${id} not found.`,
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });
    httpClientSpy.delete.and.returnValue(throwError(() => errorResponse));
    roomService.deleteRoom(id).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.delete.calls.count()).toBe(1);
  });

  it('should get Room by type API - 200', (done: DoneFn) => {
    const type = 'common';
    const testRooms: Room[] = [
      {
        id: 1,
        number: 'testNumber1',
        type: 'common',
        price: 111,
        extras: 'extras1',
        imgURL: 'imgURL1',
      },
    ];
    const testMsg = {
      status: 200,
      message: testRooms,
    };
    httpClientSpy.get.and.returnValue(of(testMsg.message));
    roomService.getRoomByType(type).subscribe({
      next: (res) => {
        expect(res).toBe(testMsg.message);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should get Room by type API - 404 no rooms for type', (done: DoneFn) => {
    const type = 'common';
    const testMsg = {
      status: 404,
      message: `No ${type} rooms.`,
    };

    const errorResponse = new HttpErrorResponse({
      error: `test ${testMsg.status} error`,
      status: testMsg.status,
      statusText: testMsg.message,
    });
    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
    roomService.getRoomByType(type).subscribe({
      error: (e) => {
        expect(e.message).toContain(testMsg.message);
        done();
      },
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
