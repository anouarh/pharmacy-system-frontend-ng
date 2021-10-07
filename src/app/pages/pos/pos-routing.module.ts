import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { PosComponent } from './pos/pos.component';

const routes: Routes = [
  { path: '', component: PosComponent },
  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosRoutingModule {}
