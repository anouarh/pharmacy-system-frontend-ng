import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

export interface Order {
  productName: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PosComponent implements OnInit {
  orders: Order[];
  selectedOrder: any;

  constructor(private rd: Renderer2) {}

  ngOnInit(): void {
    this.orders = [
      {
        productName: 'Doliprane',
        quantity: 1,
        pricePerUnit: 19.0,
        total: 19.0,
      },
      {
        productName: 'Rhumix',
        quantity: 2,
        pricePerUnit: 25.0,
        total: 50.0,
      },
      {
        productName: 'Glucofage',
        quantity: 1,
        pricePerUnit: 21.0,
        total: 21.0,
      },
      {
        productName: 'Inopril',
        quantity: 1,
        pricePerUnit: 104.0,
        total: 104.0,
      },
      {
        productName: 'Aspro',
        quantity: 1,
        pricePerUnit: 5.0,
        total: 5.0,
      },
    ];
  }

  onItemSelect(thisItem) {
    if (this.selectedOrder != null) {
      this.rd.setStyle(this.selectedOrder, 'background-color', '#fff');
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
