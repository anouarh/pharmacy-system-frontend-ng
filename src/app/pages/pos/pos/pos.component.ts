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
import { QuantityDialogComponent } from '../quantity-dialog/quantity-dialog.component';

export interface DialogData {
  drug: any;
  quantity: number;
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
      this.order.push(data);
      this.updateTotalPrice();
    }
  }

  updateTotalPrice() {
    this.order.forEach((item) => {
      this.totalPrice += item.drug.ppv * item.quantity;
    });
  }

  openInfoDialog(): void {}
}
