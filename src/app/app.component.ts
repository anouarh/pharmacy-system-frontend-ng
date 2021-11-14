import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ipcRenderer, dialog } from 'electron';
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
  version: string;
  updateAvailable: boolean;
  updateDownloaded: boolean;

  constructor(private auth: AuthService, private router: Router) {
    if (this.isElectron()) {
      ipcRenderer.send('app_version');
      ipcRenderer.on('app_version', (event, arg) => {
        ipcRenderer.removeAllListeners('app_version');
        this.version = arg.version;
      });

      ipcRenderer.on('update_available', () => {
        ipcRenderer.removeAllListeners('update_available');
        console.log('Update is available!');
      });
      ipcRenderer.on('update_downloaded', () => {
        ipcRenderer.removeAllListeners('update_downloaded');
        this.updateDownloaded = true;
        const options = {
          type: 'question',
          buttons: ['Non', 'Oui'],
          defaultId: 0,
          title: 'Mise à jour',
          message:
            process.platform === 'win32'
              ? 'Est ce que vous voulez installer la mise à jour?'
              : 'Est ce que vous voulez installer la mise à jour?',
          detail:
            'La nouvelle version a été téléchargée, veuillez fermer le programme et installer la nouvelle version',
          checkboxLabel: 'Remember my answer',
          checkboxChecked: true,
        };
        dialog.showMessageBox(null, options).then((res) => {
          if (res.response === 0) {
            ipcRenderer.send('restart_app');
          }
        });
      });
    }
  }

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

  isElectron = () => {
    return window && window.process && window.process.type;
  };
}
