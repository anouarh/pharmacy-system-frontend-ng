import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

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
  quantityMode: boolean = true;
  discountMode: boolean = false;
  priceMode: boolean = false;

  @ViewChild('qty', { static: false }) qty: ElementRef;

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
    if (mode.innerText === 'Qty') {
      this.quantityMode = true;
      this.discountMode = true;
      this.priceMode = true;
      console.log(mode.innerText);
    } else if (mode.innerText === 'Disc') {
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
    console.log(this.selectedOrder);
    let index = this.orders.indexOf(this.selectedOrder);
    this.orders.splice(index, 1);
    this.calculateTotalPrice();
    this.checkIfOrdersExist();
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
        this.calculateTotalPrice();
      } else if (this.discountMode) {
        this.calculateTotalPrice();
      } else {
        this.calculateTotalPrice();
      }
    }
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
