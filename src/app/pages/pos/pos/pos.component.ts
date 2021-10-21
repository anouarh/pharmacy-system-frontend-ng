import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faCartPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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
  orders: any = [];
  products: Product[];
  drugs: any;
  currentUser: any;
  selectedDrug: any;

  faCartPlus = faCartPlus;
  faInfoCircle = faInfoCircle;
  quantity: number;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private drugsService: DrugsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      let res = JSON.parse(
        this.router.getCurrentNavigation().extras.state.orders
      );
      this.orders = JSON.parse(res);
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
        console.log(this.drugs);
      });
  }

  openQtyDialog(item): void {
    console.log(item);
    const dialogRef = this.dialog.open(QuantityDialogComponent, {
      width: '500px',
      data: { drug: item, quantity: this.quantity },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openInfoDialog(): void {}
}
