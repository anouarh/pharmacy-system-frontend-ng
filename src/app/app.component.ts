import { Component } from '@angular/core';
import {
  faPrescriptionBottleAlt,
  faTachometerAlt,
  faBars,
  faUserCircle,
  faCog,
  faSignOutAlt,
  faMoneyBillWave,
  faChartBar,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
}
