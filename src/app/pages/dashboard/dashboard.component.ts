import { Component, OnInit } from '@angular/core';
import {
  faArrowRight,
  faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';
import { DrugsService } from '../../services/drugs.service';
import { SalesOrderService } from '../../services/salesorder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  salesToday: any;
  itemsWithOneUnit: number = 0;
  faMoneyBillWave = faMoneyBillWave;
  iventoryItems: any;
  salesOrders: any = [];
  isLoading: boolean = false;
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
    this.isLoading = true;
    this.salesOrderService
      .getTodaysSales(this.currentUser.username)
      .subscribe((result) => {
        this.salesToday = result;
        this.isLoading = false;
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
