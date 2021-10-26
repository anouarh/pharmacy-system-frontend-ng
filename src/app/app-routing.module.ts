import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { IsSignedInGuard } from './services/issignedin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },

  {
    path: 'drugs',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/drugs/drugs.module').then((m) => m.DrugsModule),
  },
  {
    path: 'pos',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/pos/pos.module').then((m) => m.PosModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'reporting',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/reporting/reporting.module').then(
        (m) => m.ReportingModule
      ),
  },
  { path: 'login', component: LoginComponent, canActivate: [IsSignedInGuard] },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
