import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommaExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static AUTH_URL = environment.authUrl;

  constructor(private http: HttpClient) {}

  login(loginPayload) {
    const headers = {
      Authorization: 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded',
    };
    return this.http.post(
      'http://localhost:8080/' + 'oauth/token',
      loginPayload,
      { headers }
    );
  }
}
