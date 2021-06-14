import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Systéme de Gestion de Pharmacie';

  private userSub: Subscription;
  isAuthenticated = false;

  faPrescriptionBottleAlt = faPrescriptionBottleAlt;
  faTachometerAlt = faTachometerAlt;
  faBars = faBars;
  faUserCircle = faUserCircle;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faMoneyBillWave = faMoneyBillWave;
  faChartBar = faChartBar;
  faSignInAlt = faSignInAlt;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      // !!user  <=> !user ? false : true;
      this.isAuthenticated = !!user;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
