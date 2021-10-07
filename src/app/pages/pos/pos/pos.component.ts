import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  faBackspace,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/services/product.model';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PosComponent implements OnInit {
  p1: Product = new Product(123, 'Doliprane', 1, 19.0);
  p2: Product = new Product(124, 'Rhumix', 1, 29.0);
  p3: Product = new Product(125, 'Glucofage', 1, 32.0);
  p4: Product = new Product(126, 'Aspro', 1, 10.0);
  p5: Product = new Product(127, 'Inopril', 1, 105.0);
  orders: Product[] = [];
  products: Product[];

  htmlSelectedOrder: any;
  selectedOrder: Product;

  totalPrice: number = 0;
  ordersExist: boolean = false;

  htmlSelectedMode: any = null;
  quantityMode: boolean = true;
  discountMode: boolean = false;
  priceMode: boolean = false;

  faChevronCircleRight = faChevronCircleRight;
  faBackspace = faBackspace;

  @ViewChild('qty', { static: false }) qty: ElementRef;

  constructor(private rd: Renderer2, private router: Router) {}

  ngOnInit(): void {
    this.products = [this.p1, this.p2, this.p3, this.p4, this.p5];
  }

  onPaymentClick() {
    console.log('Routing to payment');
    this.router.navigate(['pos/payment']);
  }

  onModeClick(mode) {
    if (this.htmlSelectedMode != null) {
      this.rd.setStyle(this.htmlSelectedMode, 'background-color', 'inherit');
      this.rd.setStyle(this.htmlSelectedMode, 'color', 'black');
      this.htmlSelectedMode = mode;
      this.rd.setStyle(mode, 'background-color', '#6EC89B');
      this.rd.setStyle(mode, 'color', '#fff');
    } else {
      this.rd.setStyle(this.qty.nativeElement, 'background-color', 'inherit');
      this.rd.setStyle(this.qty.nativeElement, 'color', 'black');
      this.htmlSelectedMode = mode;
      this.rd.setStyle(mode, 'background-color', '#6EC89B');
      this.rd.setStyle(mode, 'color', '#fff');
    }
    if (mode.innerText === 'Qté') {
      this.quantityMode = true;
      this.discountMode = true;
      this.priceMode = true;
      console.log(mode.innerText);
    } else if (mode.innerText === 'Réduc') {
      this.discountMode = true;
      this.priceMode = false;
      this.quantityMode = false;
      console.log(mode.innerText);
    } else {
      this.priceMode = true;
      this.quantityMode = false;
      this.discountMode = false;
      console.log(mode.innerText);
    }
  }

  onRemoveClick() {
    if (this.selectedOrder != null) {
      let index = this.orders.indexOf(this.selectedOrder);
      this.orders.splice(index, 1);
      this.calculateTotalPrice();
      this.checkIfOrdersExist();
    }
  }

  checkIfOrdersExist() {
    if (this.orders != null && this.orders.length > 0) {
      this.ordersExist = true;
    } else {
      this.ordersExist = false;
    }
  }

  onNumberClick(event) {
    if (this.selectedOrder != null) {
      if (this.quantityMode) {
        let number = event.srcElement.innerText;
        let index = this.orders.indexOf(this.selectedOrder);
        this.orders[index]['quantity'] = parseInt(
          '' + this.orders[index]['quantity'] + number
        );
        this.orders[index]['total'] =
          this.orders[index]['quantity'] * this.orders[index]['pricePerUnit'];
      } else if (this.discountMode) {
      } else {
        let number = event.srcElement.innerText;
        let index = this.orders.indexOf(this.selectedOrder);
        this.orders[index]['pricePerUnit'] = parseInt(
          '' + this.orders[index]['pricePerUnit'] + number
        );
        this.orders[index]['total'] =
          this.orders[index]['quantity'] * this.orders[index]['pricePerUnit'];
      }
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    if (this.orders != null && this.orders.length > 0) {
      this.orders.forEach((order) => {
        this.totalPrice += order.pricePerUnit * order.quantity;
      });
    }
  }

  onProductSelect(index) {
    if (this.orders.includes(this.products[index])) {
      let orderIndex = this.orders.indexOf(this.products[index]);
      this.orders[orderIndex]['quantity']++;
      this.orders[orderIndex]['total'] =
        this.orders[orderIndex]['quantity'] *
        this.orders[orderIndex]['pricePerUnit'];
    } else {
      this.orders.push(this.products[index]);
    }

    this.ordersExist = true;
    this.calculateTotalPrice();
  }

  onItemSelect(thisItem, i) {
    if (this.htmlSelectedOrder != null) {
      this.selectedOrder = this.orders[i];
      this.rd.setStyle(this.htmlSelectedOrder, 'background-color', '');
      this.htmlSelectedOrder = thisItem;
      this.rd.setStyle(
        thisItem,
        'background-color',
        'rgba(140, 143, 183, 0.2)'
      );
    } else {
      this.selectedOrder = this.orders[i];
      this.htmlSelectedOrder = thisItem;
      this.rd.setStyle(
        thisItem,
        'background-color',
        'rgba(140, 143, 183, 0.2)'
      );
    }
  }
}
