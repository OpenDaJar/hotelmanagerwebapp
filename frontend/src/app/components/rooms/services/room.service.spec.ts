import { TestBed } from '@angular/core/testing';

import { RoomService } from './room.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Room } from '../../../models/room.model';



describe('RoomService', () => {
  const API_URL = 'http://localhost:6868/api/rooms';
  let roomService: RoomService;
  let httpClient: HttpClientTestingModule;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[RoomService]
    });
    roomService = TestBed.inject(RoomService);
    httpClient = TestBed.inject(HttpClientTestingModule);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(roomService).toBeTruthy();
  });

  it('get all Rooms API',()=>{
    const testRooms:Room[] =[]
    roomService.getAllRooms().subscribe((data)=>{
      expect(data).toEqual(testRooms)
    })
    const req = httpTestingController.expectOne(
      API_URL + '/getRooms'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testRooms);
    httpTestingController.verify();
  })

  it('get Room API',()=>{
    const testRoom: Room = {
      id: 1,
      number: 'testNumber',
      type: 'common',
      price: 1222,
      extras: 'extras',
      imgURL: 'imgURL',
    };
    roomService.getRoom(testRoom.id).subscribe((data) => {
      expect(data).toEqual(testRoom);
    });
    const req = httpTestingController.expectOne(
      API_URL + '/getRoom/' + testRoom.id
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testRoom);
    httpTestingController.verify();

  })

  it('update Room API',()=>{
    const testRoom:Room={
      id: 1,
      number: 'testNumber',
    }
    const testMsg = {message: `Room with id=${testRoom.id} was updated successfully.`}
    roomService.updateRoom(testRoom.id,testRoom).subscribe((data)=>{
      expect(data).toEqual(testMsg)
    })

    const req = httpTestingController.expectOne(
      API_URL + '/updateRoom/' + testRoom.id
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(testMsg);
    httpTestingController.verify();
  })

  it('delete Room API',()=>{
    const testRoom: Room = {
      id: 1,
      number: 'testNumber',
      type: 'common',
      price: 1222,
      extras: 'extras',
      imgURL: 'imgURL',
    };

    const testMsg= {message: `Room with id=${testRoom.id} was deleted successfully.`,}
    roomService.deleteRoom(testRoom.id).subscribe((data)=>{
      expect(data).toEqual(testMsg)
    })

    const req = httpTestingController.expectOne(
      API_URL + '/deleteRoom/' + testRoom.id
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush(testMsg);
    httpTestingController.verify();

  })

  it('get Rooms by Type',()=>{
    const testType = 'common'
    const testRooms:Room[] = []
    roomService.getRoomByType(testType).subscribe((data)=>{
      expect(data).toEqual(testRooms)
    })
    const req = httpTestingController.expectOne(
      API_URL + '/getRoomsByType/'+testType
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testRooms);
    httpTestingController.verify();
  })


});
