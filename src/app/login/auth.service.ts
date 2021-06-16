import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

let loginEndpoint = environment.api + 'login';

export interface AuthResponsData {
  username: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  isAuthenticated = false;

  constructor(private http: HttpClient) {}

  signup() {}

  login(username: string, password: string) {
    return this.http
      .post<AuthResponsData>(loginEndpoint, {
        username: username,
        password: password,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(username, resData.token);
        })
      );
  }

  private handleAuthentication(username: string, token: string) {
    const user = new User(username, token);
    this.user.next(user);
  }
}
