import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookRoom } from 'src/app/models/book-room.model';

const API_URL = 'http://localhost:8080/api/bookings';

@Injectable({
  providedIn: 'root'
})
export class AddBookingService {

  constructor(private http: HttpClient) {}

  createBooking(data:BookRoom): Observable<any>{
    return this.http.post(`${API_URL}/addBooking`,data);
  }

}

