//methods for sending HTTP requests to the Apis.
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../../models/room.model';

const API_URL = 'http://localhost:6868/api/rooms';
const API_URL_FILES = 'http://localhost:6868/api/files';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${API_URL}/getRooms`);
  }

  getRoom(id: any): Observable<Room> {
    return this.http.get<Room>(`${API_URL}/getRoom/${id}`);
  }

  updateRoom(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}/updateRoom/${id}`, data);
  }

  deleteRoom(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/deleteRoom/${id}`);
  }

  getRoomByType(type: any): Observable<Room[]> {
    return this.http.get<Room[]>(`${API_URL}/getRoomsByType/${type}`);
  }

  // getFile(name: string): Observable<any> {
  //   return this.http.get(`${API_URL_FILES}/getFile/${name}`);
  // }
}
