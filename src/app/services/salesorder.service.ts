import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { SalesOrder } from '../models/salesorder.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SalesOrderService implements OnInit {
  static baseUrl = environment.api;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    console.log(this.auth.user);
  }


  getTodaysSales(username: string) {
    return this.http.get(
      SalesOrderService.baseUrl + 'salesOrders/salesToday/' + username
    );
  }

  saveSalesOrder(salesOrder: SalesOrder) {
    return this.http.post(
      SalesOrderService.baseUrl + 'salesOrders',
      salesOrder
    );
  }
}
