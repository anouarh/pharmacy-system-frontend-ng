import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/services/product.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentComponent implements OnInit {
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  total: number;
  orders: Product[];

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.orders = this.router.getCurrentNavigation().extras.state.orders;
      this.total = this.router.getCurrentNavigation().extras.state.total;
    }
  }

  ngOnInit(): void {
    console.log(this.orders);
  }

  returnToOrder() {
    this.router.navigate(['pos'], {
      state: {
        orders: JSON.stringify(this.orders),
      },
    });
  }
}
