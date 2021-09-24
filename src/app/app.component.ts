import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faBars,
  faChartBar,
  faCog,
  faMoneyBillWave,
  faPrescriptionBottleAlt,
  faSignInAlt,
  faSignOutAlt,
  faTachometerAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
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

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
