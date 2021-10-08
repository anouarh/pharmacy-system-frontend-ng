import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBackspace,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/services/product.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentComponent implements OnInit, AfterViewChecked {
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  orderIsAllSet: boolean = false;
  paymentMethod: string;
  faBackspace = faBackspace;
  faTimes = faTimes;
  @ViewChild('cashInput', { static: false }) cashInput: ElementRef;

  total: number;
  orders: Product[];

  cash: any;

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.orders = this.router.getCurrentNavigation().extras.state.orders;
      this.total = this.router.getCurrentNavigation().extras.state.total;
    }
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.focusInput();
  }

  focusInput() {
    this.cashInput.nativeElement.focus();
  }

  onNumpadButtonClick(event) {
    let btn = event.srcElement.innerText;
    console.log(btn);
  }

  keypress(event: KeyboardEvent) {
    console.log(event);
  }

  returnToOrder() {
    this.router.navigate(['pos'], {
      state: {
        orders: JSON.stringify(this.orders),
      },
    });
  }
}
