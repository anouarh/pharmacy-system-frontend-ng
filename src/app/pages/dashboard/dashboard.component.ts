import { Component, OnInit } from '@angular/core';
import {
  faArrowRight,
  faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';
import { DrugsService } from 'src/app/services/drugs.service';
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
  itemsWithOneUnit: number = 0;
  faMoneyBillWave = faMoneyBillWave;
  iventoryItems: any;
  salesOrders: any = [];
  constructor(
    private salesOrderService: SalesOrderService,
    private drugsService: DrugsService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getTodaysSales();
    this.getAllIventoryItems();
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

  getAllIventoryItems() {
    this.drugsService
      .getAllByUsername(this.currentUser.username)
      .subscribe((result) => {
        this.iventoryItems = result;
        localStorage.getItem('userData');
      });
  }
}
