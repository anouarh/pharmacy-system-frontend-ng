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
import { Drug } from 'src/app/services/drug.model';
import { DrugsService } from 'src/app/services/drugs.service';
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
  orders: any = [];
  products: Product[];
  drugs: any;

  htmlSelectedOrder: any;
  selectedOrder: Product;

  totalPrice: number = 0;
  ordersExist: boolean = false;

  htmlSelectedMode: any = null;
  quantityMode: boolean = true;
  discountMode: boolean = false;
  priceMode: boolean = false;

  currentUser: any;
  isLoadingResults: boolean = false;

  faChevronCircleRight = faChevronCircleRight;
  faBackspace = faBackspace;

  @ViewChild('qty', { static: false }) qty: ElementRef;

  constructor(
    private rd: Renderer2,
    private router: Router,
    private drugsService: DrugsService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      let res = JSON.parse(
        this.router.getCurrentNavigation().extras.state.orders
      );
      this.orders = JSON.parse(res);
      this.calculateTotalPrice();
      this.checkIfOrdersExist();
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
    this.isLoadingResults = true;
    this.drugsService
      .getAllByUsername(this.currentUser.username)
      .subscribe((result) => {
        this.drugs = result;
        this.isLoadingResults = false;
        localStorage.getItem('userData');
      });
  }

  onPaymentClick() {
    console.log('Routing to payment');
    this.router.navigate(['pos/payment'], {
      state: {
        orders: JSON.stringify(this.orders),
        total: JSON.stringify(this.totalPrice),
      },
      skipLocationChange: true,
    });
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
    } else if (mode.innerText === 'Réduc') {
      this.discountMode = true;
      this.priceMode = false;
      this.quantityMode = false;
    } else {
      this.priceMode = true;
      this.quantityMode = false;
      this.discountMode = false;
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
          this.orders[index]['quantity'] * this.orders[index]['ppv'];
      } else if (this.discountMode) {
      } else {
        let number = event.srcElement.innerText;
        let index = this.orders.indexOf(this.selectedOrder);
        this.orders[index]['ppv'] = parseInt(
          '' + this.orders[index]['ppv'] + number
        );
        this.orders[index]['total'] =
          this.orders[index]['quantity'] * this.orders[index]['ppv'];
      }
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    if (this.orders != null && this.orders.length > 0) {
      this.orders.forEach((order) => {
        this.totalPrice += order.ppv * order.quantity;
      });
    }
  }

  onProductSelect(index) {
    if (this.orders.includes(this.drugs[index])) {
      let orderIndex = this.orders.indexOf(this.drugs[index]);
      this.orders[orderIndex]['quantity']++;
      this.orders[orderIndex]['total'] =
        this.orders[orderIndex]['quantity'] * this.orders[orderIndex]['ppv'];
    } else {
      this.drugs[index]['quantity'] = 1;
      this.drugs[index]['total'] =
        this.drugs[index]['quantity'] * this.drugs[index]['ppv'];
      //let newOrder = Object.assign({}, this.drugs[index]);
      this.orders.push(this.drugs[index]);
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
