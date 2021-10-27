import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosComponent } from './pos/pos.component';
import { PosRoutingModule } from './pos-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { QuantityDialogComponent } from './quantity-dialog/quantity-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [PosComponent, QuantityDialogComponent, PaymentDialogComponent],
  imports: [
    CommonModule,
    PosRoutingModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDividerModule,
  ],
})
export class PosModule {}
