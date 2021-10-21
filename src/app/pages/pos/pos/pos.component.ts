import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  faCartPlus,
  faEdit,
  faInfoCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { DrugsService } from 'src/app/services/drugs.service';
import { Product } from 'src/app/services/product.model';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { QuantityDialogComponent } from '../quantity-dialog/quantity-dialog.component';

export interface OrderDialogData {
  drug: any;
  quantity: number;
}

export interface PaymentDialogData {
  order: any;
  totalPrice: number;
}

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
})
export class PosComponent implements OnInit {
  order: any = [];
  products: Product[];
  drugs: any;
  currentUser: any;
  totalPrice: number = 0;

  faCartPlus = faCartPlus;
  faInfoCircle = faInfoCircle;
  faEdit = faEdit;
  faTrash = faTrash;
  quantity: number = 1;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private drugsService: DrugsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      let res = JSON.parse(
        this.router.getCurrentNavigation().extras.state.orders
      );
      this.order = JSON.parse(res);
    }
  }

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
    //this.isLoadingResults = true;
    this.drugsService
      .getAllByUsername(this.currentUser.username)
      .subscribe((result) => {
        this.drugs = result;
        //this.isLoadingResults = false;
        localStorage.getItem('userData');
      });
  }

  deleteItemFromOrder(item) {
    let index = this.order.indexOf(item);
    if (index > -1) this.order.splice(index, 1);
    this.updateTotalPrice();
  }

  openQtyDialog(item): void {
    const dialogRef = this.dialog.open(QuantityDialogComponent, {
      width: '500px',
      data: { drug: item, quantity: this.quantity },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.addToOrder(result);
    });
  }

  addToOrder(data) {
    if (data != undefined) {
      console.log(data);
      let index = this.indexOfDrugInOrder(data.drug.id);
      console.log(index);
      if (this.order.length > 0 && index > -1) {
        this.order[index].quantity += data.quantity;
      } else {
        this.order.push(data);
      }
      this.updateTotalPrice();
    }
  }

  indexOfDrugInOrder(id): number {
    for (let i = 0; i < this.order.length; i++) {
      if (this.order[i].drug['id'] == id) return i;
      else continue;
    }
    return -1;
  }

  updateTotalPrice() {
    if (this.order.length > 0) {
      this.order.forEach((item) => {
        this.totalPrice += item.drug.ppv * item.quantity;
      });
    } else {
      this.totalPrice = 0;
    }
  }

  openInfoDialog(): void {}

  openPaymentDialog() {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '500px',
      height: '90vh',
      data: { order: this.order, totalPrice: this.totalPrice },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
