import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { appendFileSync } from 'fs';

export interface Order {
  id: number;
  productName: string;
  quantity: number;
  pricePerUnit: number;
}

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PosComponent implements OnInit {
  orders: Order[] = [];
  products: Order[];

  htmlSelectedOrder: any;
  selectedOrder: Order;

  totalPrice: number = 0;
  ordersExist: boolean = false;

  htmlSelectedMode: any = null;
  quantityMode: boolean = false;
  discountMode: boolean = false;
  priceMode: boolean = false;

  constructor(private rd: Renderer2) {}

  ngOnInit(): void {
    this.products = [
      {
        id: 123,
        productName: 'Doliprane',
        quantity: 1,
        pricePerUnit: 19.0,
      },
      {
        id: 121,
        productName: 'Rhumix',
        quantity: 2,
        pricePerUnit: 25.0,
      },
      { id: 173, productName: 'Glucofage', quantity: 1, pricePerUnit: 21.0 },
      {
        id: 342,
        productName: 'Inopril',
        quantity: 1,
        pricePerUnit: 104.0,
      },
      {
        id: 213,
        productName: 'Aspro',
        quantity: 1,
        pricePerUnit: 5.0,
      },
    ];
  }

  onModeClick(mode) {
    if (this.htmlSelectedMode != null) {
      this.rd.setStyle(this.htmlSelectedMode, 'background-color', '');
      this.rd.setStyle(this.htmlSelectedMode, 'color', 'black');
      this.htmlSelectedMode = mode;
      this.rd.setStyle(mode, 'background-color', '#6EC89B');
      this.rd.setStyle(mode, 'color', '#fff');
    } else {
      this.htmlSelectedMode = mode;
      this.rd.setStyle(mode, 'background-color', '#6EC89B');
      this.rd.setStyle(mode, 'color', '#fff');
    }
    if (mode.innerText === 'Qty') {
      this.quantityMode = true;
      console.log(mode.innerText);
    } else if (mode.innerText === 'Disc') {
      this.discountMode = true;
      console.log(mode.innerText);
    } else {
      this.priceMode = true;
      console.log(mode.innerText);
    }
  }

  onNumberClick(event) {
    let number = event.srcElement.innerText;
  }

  calculateTotalPrice() {
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
