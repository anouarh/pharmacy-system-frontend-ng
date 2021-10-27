import { Component, OnInit } from '@angular/core';
import { SalesOrderService } from 'src/app/services/salesorder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  isLoadingResults: boolean = false;
  moneyMadeToday: any;
  constructor(private salesOrderService: SalesOrderService) {}

  ngOnInit(): void {
    this.getUserData();
    this.getTodaysSales();
  }

  getUserData() {
    const userData: {
      username: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    this.currentUser = userData;
  }

  getTodaysSales() {
    this.isLoadingResults = true;
    this.salesOrderService
      .getTodaysSales(this.currentUser.username)
      .subscribe((result) => {
        this.moneyMadeToday = result;
        this.isLoadingResults = false;
        localStorage.getItem('userData');
      });
  }
}
