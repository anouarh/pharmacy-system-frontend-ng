import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos/pos.component';

@NgModule({
  declarations: [PosComponent],
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
