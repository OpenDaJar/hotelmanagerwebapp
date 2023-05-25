import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookRoom } from 'src/app/models/book-room.model';
import { Room } from 'src/app/models/room.model';

const API_URL_ROOMS = 'http://localhost:6868/api/rooms';
const API_URL_BOOKINGS = 'http://localhost:6868/api/bookings';

@Injectable({
  providedIn: 'root',
})
export class BookingssService {
  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<BookRoom[]> {
    return this.http.get<Room[]>(`${API_URL_BOOKINGS}/findAllBookings`);
  }

  getRoom(id: any): Observable<Room> {
    return this.http.get<Room>(`${API_URL_ROOMS}/getRoom/${id}`);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${API_URL_BOOKINGS}/deleteBooking/${id}`);
  }
}
