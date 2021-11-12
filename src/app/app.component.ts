import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBars,
  faChartBar,
  faCog,
  faMoneyBillWave,
  faPrescriptionBottleAlt,
  faReceipt,
  faSignInAlt,
  faSignOutAlt,
  faTachometerAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { ipcRenderer } from 'electron';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy, OnChanges {
  isAuthenticated = false;
  private userSub: Subscription;
  title = 'PharmaSys';
  username: string;

  faPrescriptionBottleAlt = faPrescriptionBottleAlt;
  faTachometerAlt = faTachometerAlt;
  faBars = faBars;
  faUserCircle = faUserCircle;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faMoneyBillWave = faMoneyBillWave;
  faChartBar = faChartBar;
  faSignInAlt = faSignInAlt;
  faReceipt = faReceipt;
  ipcRenderer: typeof ipcRenderer;
  messages: string;

  constructor(private auth: AuthService, private router: Router) {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcRenderer.on('message', (arg, data) => {
        this.messages = data;
      });

      this.ipcRenderer.on('downloadProgress', (event, data) => {
        console.log(data);
      });
    }
  }

  ngOnChanges(): void {
    console.log(this.messages);
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  };

  ngOnInit(): void {
    this.auth.autoLogin();
    this.userSub = this.auth.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) this.username = user.username;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.username = null;
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
