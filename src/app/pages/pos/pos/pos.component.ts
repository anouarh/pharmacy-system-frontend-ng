import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

export interface Order {
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
export class PosComponent implements OnInit, AfterViewChecked {
  @ViewChild('ordersContainer') private ordersContainer: ElementRef;
  orders: Order[];
  products: Order[];
  selectedOrder: any;
  totalPrice: number = 0;

  constructor(private rd: Renderer2) {}

  ngOnInit(): void {
    this.orders = [
      {
        productName: 'Doliprane',
        quantity: 1,
        pricePerUnit: 19.0,
      },
      {
        productName: 'Rhumix',
        quantity: 2,
        pricePerUnit: 25.0,
      },
      {
        productName: 'Glucofage',
        quantity: 1,
        pricePerUnit: 21.0,
      },
      {
        productName: 'Inopril',
        quantity: 1,
        pricePerUnit: 104.0,
      },
      {
        productName: 'Aspro',
        quantity: 1,
        pricePerUnit: 5.0,
      },
    ];
    this.products = [
      {
        productName: 'Doliprane',
        quantity: 1,
        pricePerUnit: 19.0,
      },
      {
        productName: 'Rhumix',
        quantity: 2,
        pricePerUnit: 25.0,
      },
      {
        productName: 'Glucofage',
        quantity: 1,
        pricePerUnit: 21.0,
      },
      {
        productName: 'Inopril',
        quantity: 1,
        pricePerUnit: 104.0,
      },
      {
        productName: 'Aspro',
        quantity: 1,
        pricePerUnit: 5.0,
      },
    ];
    this.calculateTotalPrice();
    //this.updateScroll();
  }

  ngAfterViewChecked(): void {
    //this.updateScroll();
  }

  calculateTotalPrice() {
    this.orders.forEach((order) => {
      this.totalPrice += order.pricePerUnit * order.quantity;
    });
  }

  updateScroll() {
    this.ordersContainer.nativeElement.scrollTop =
      this.ordersContainer.nativeElement.scrollHeight;
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
