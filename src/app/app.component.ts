import { Component, OnInit } from '@angular/core';
import {
  faBars, faChartBar, faCog, faMoneyBillWave, faPrescriptionBottleAlt, faSignInAlt, faSignOutAlt, faTachometerAlt, faUserCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Systéme de Gestion de Pharmacie';

  faPrescriptionBottleAlt = faPrescriptionBottleAlt;
  faTachometerAlt = faTachometerAlt;
  faBars = faBars;
  faUserCircle = faUserCircle;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faMoneyBillWave = faMoneyBillWave;
  faChartBar = faChartBar;
  faSignInAlt = faSignInAlt;

  constructor() {}

  ngOnInit(): void {}
}
