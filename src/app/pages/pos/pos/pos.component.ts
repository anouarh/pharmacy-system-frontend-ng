import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  faCartPlus,
  faEdit,
  faInfoCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { SalesOrder } from 'src/app/models/salesorder.model';
import { SalesOrderItem } from 'src/app/models/salesorderitem.model';
import { DrugsService } from 'src/app/services/drugs.service';
import { SalesOrderService } from 'src/app/services/salesorder.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { QuantityDialogComponent } from '../quantity-dialog/quantity-dialog.component';

export class PaymentDialogData {
  salesOrder: SalesOrder;
  totalPrice: number;
}

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
})
export class PosComponent implements OnInit {
  salesOrder: SalesOrder;
  salesOrderItems: SalesOrderItem[] = [];
  drugs: any;
  currentUser: any;
  totalPrice: number = 0;

  faCartPlus = faCartPlus;
  faInfoCircle = faInfoCircle;
  faEdit = faEdit;
  faTrash = faTrash;
  quantity: number = 1;
  isLoadingResults: boolean = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private drugsService: DrugsService,
    private salesOrderService: SalesOrderService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getAllDrugs();
  }

  getUserData() {
    const userData: {
      username: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    this.currentUser = userData;
  }

  getAllDrugs() {
    this.isLoadingResults = true;
    this.drugsService
      .getAllByUsername(this.currentUser.username)
      .subscribe((result) => {
        this.drugs = result;
        this.isLoadingResults = false;
        localStorage.getItem('userData');
      });
  }

  deleteItemFromOrder(item) {
    let index = this.salesOrderItems.indexOf(item);
    if (index > -1) this.salesOrderItems.splice(index, 1);
    this.updateTotalPrice();
  }

  openQtyDialog(item): void {
    const dialogRef = this.dialog.open(QuantityDialogComponent, {
      width: '500px',
      data: {
        inventoryItem: item,
        quantity: this.quantity,
        unitPrice: item.drug.ppv,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.addToOrder(result);
    });
  }

  addToOrder(data) {
    if (data != undefined) {
      let index = this.indexOfDrugInSalesOrderItems(data.inventoryItem.drug.id);
      if (this.salesOrderItems.length > 0 && index > -1) {
        this.salesOrderItems[index].quantity += data.quantity;
      } else {
        let newSalesOrderItem = new SalesOrderItem(
          data.quantity,
          data.unitPrice,
          data.inventoryItem
        );
        this.salesOrderItems.push(newSalesOrderItem);
        console.log(this.salesOrderItems);
      }
      this.updateTotalPrice();
    }
  }

  indexOfDrugInSalesOrderItems(id): number {
    for (let i = 0; i < this.salesOrderItems.length; i++) {
      if (this.salesOrderItems[i].inventoryItem.drug['id'] == id) return i;
      else continue;
    }
    return -1;
  }

  updateTotalPrice() {
    if (this.salesOrderItems.length > 0) {
      this.totalPrice = 0;
      this.salesOrderItems.forEach((item) => {
        this.totalPrice += item.inventoryItem.drug.ppv * item.quantity;
      });
    } else {
      this.totalPrice = 0;
    }
  }

  openInfoDialog(): void {}

  openPaymentDialog() {
    let newSalesOrder = new SalesOrder(new Date(), this.salesOrderItems);
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '500px',
      height: '90vh',
      data: { salesOrder: newSalesOrder, totalPrice: this.totalPrice },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.saveSalesOrder(result);
    });
  }

  saveSalesOrder(data) {
    if (data != undefined) {
      console.log(data.salesOrder);
      this.salesOrderService
        .saveSalesOrder(data.salesOrder)
        .subscribe((result) => {
          console.log(result);
          //this.getAllDrugs();
          window.location.reload();
        });
    }
  }
}
