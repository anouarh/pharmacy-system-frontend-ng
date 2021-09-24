import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DrugsService {
  static baseUrl = environment.api;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getDrugs() {
    return this.auth.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get(
          DrugsService.baseUrl + 'drugs?access_token=' + user.token
        );
      })
    );
  }
}
