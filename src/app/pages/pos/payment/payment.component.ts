import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentComponent implements OnInit {
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  total: number = 185;

  constructor() {}

  ngOnInit(): void {}
}
