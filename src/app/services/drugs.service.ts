import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DrugsService implements OnInit {
  static baseUrl = environment.api;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    console.log(this.auth.user);
  }

  getAllByUsername(username: string) {
    return this.http.get(
      DrugsService.baseUrl + 'inventoryItems/inventoryItemsByUser/' + username
    );
  }

  searchByName(username: string, drugName: string) {
    return this.http.get(
      DrugsService.baseUrl +
        'inventoryItems/findByName/' +
        username +
        '?name=' +
        drugName
    );
  }
}
