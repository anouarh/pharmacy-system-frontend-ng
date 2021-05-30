import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get(endPoint: string) {
    return this.http.get(`${endPoint}`);
  }

  put(endPoint: string, id: any, body: any) {
    return this.http.put(`${endPoint}/${id}`, body);
  }

  post(endPoint: string, body: any) {
    return this.http.post(`${endPoint}`, body);
  }
}
