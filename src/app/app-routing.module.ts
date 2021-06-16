import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRouteGuardService } from './login/auth-route-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/drugs', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'drugs',
    loadChildren: () =>
      import('./pages/drugs/drugs.module').then((m) => m.DrugsModule),
    canActivate: [AuthRouteGuardService],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthRouteGuardService],
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./pages/sales/sales.module').then((m) => m.SalesModule),
    canActivate: [AuthRouteGuardService],
  },
  {
    path: 'reporting',
    loadChildren: () =>
      import('./pages/reporting/reporting.module').then(
        (m) => m.ReportingModule
      ),
    canActivate: [AuthRouteGuardService],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
