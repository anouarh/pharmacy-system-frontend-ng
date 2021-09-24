import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../services/user.model';

export interface AuthResponseData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  login(loginPayload) {
    const headers = {
      Authorization: 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded',
    };
    return this.http
      .post<AuthResponseData>(
        'http://localhost:8080/' + 'oauth/token',
        loginPayload,
        { headers }
      )
      .pipe(
        catchError(null),
        tap((res) => {
          const expirationDate = new Date(
            new Date().getTime() + +res.expires_in * 1000
          );
          const user = new User(
            'Alex123',
            '123456',
            res.access_token,
            expirationDate
          );
          this.user.next(user);
        })
      );
  }
}
