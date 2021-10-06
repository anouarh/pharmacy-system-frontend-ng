import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

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
  products: Order[];input
  selectedOrder: any;
  totalPrice: number = 0;
  ordersExist: boolean = false;

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

  onItemSelect(thisItem) {
    if (this.selectedOrder != null) {
      this.rd.setStyle(this.selectedOrder, 'background-color', '');
      this.selectedOrder = thisItem;
      this.rd.setStyle(
        thisItem,
        'background-color',
        'rgba(140, 143, 183, 0.2)'
      );
    } else {
      this.selectedOrder = thisItem;
      this.rd.setStyle(
        thisItem,
        'background-color',
        'rgba(140, 143, 183, 0.2)'
      );
    }
  }
}
