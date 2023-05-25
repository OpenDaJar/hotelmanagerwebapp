import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:6868/api/files';

@Injectable({
  providedIn: 'root',
})
export class UploadImagesService {
  constructor(private http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${API_URL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${API_URL}/getListFiles`);
  // }

  // getFile(name: string): Observable<any> {
  //   return this.http.get(`${API_URL}/getFile/${name}`);
  // }
}
