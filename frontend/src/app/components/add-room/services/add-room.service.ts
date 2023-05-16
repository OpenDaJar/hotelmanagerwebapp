import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const API_URL = 'http://localhost:8080/api/rooms';
const API_URL = 'http://localhost:6868/api/rooms';

@Injectable({
  providedIn: 'root'
})
export class AddRoomService {

  constructor(private http: HttpClient) {}

  createRoom(data:any): Observable<any> {
    return this.http.post(`${API_URL}/addroom`,data);
  }
}
