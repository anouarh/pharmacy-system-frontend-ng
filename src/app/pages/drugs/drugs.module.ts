import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugsRoutingModule } from './drugs-routing.module';
import { DrugsComponent } from './drugs-list/drugs.component';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button'; 

@NgModule({
  declarations: [DrugsComponent],
  imports: [
    CommonModule,
    DrugsRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FontAwesomeModule,
    MatButtonModule
  ],
})
export class DrugsModule {}
