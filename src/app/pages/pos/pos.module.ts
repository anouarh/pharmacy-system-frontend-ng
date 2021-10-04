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
  ],
})
export class PosModule {}
