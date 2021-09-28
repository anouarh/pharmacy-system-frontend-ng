import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugsRoutingModule } from './drugs-routing.module';
import { DrugsComponent } from './drugs-list/drugs.component';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DrugsSearchDialogComponent } from './drugs-search-dialog/drugs-search-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DrugsComponent, DrugsSearchDialogComponent],
  imports: [
    CommonModule,
    DrugsRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
  ],
  entryComponents: [DrugsSearchDialogComponent],
})
export class DrugsModule {}
