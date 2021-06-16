import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
i;

const routes: Routes = [
  { path: '', redirectTo: '/drugs', pathMatch: 'full' },

  {
    path: 'drugs',
    loadChildren: () =>
      import('./pages/drugs/drugs.module').then((m) => m.DrugsModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./pages/sales/sales.module').then((m) => m.SalesModule),
  },
  {
    path: 'reporting',
    loadChildren: () =>
      import('./pages/reporting/reporting.module').then(
        (m) => m.ReportingModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
