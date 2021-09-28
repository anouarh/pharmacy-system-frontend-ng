import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosComponent } from './pos/pos.component';
import { PosRoutingModule } from './pos-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PosComponent],
  imports: [
    CommonModule,
    PosRoutingModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatInputModule,
  ],
})
export class PosModule {}
