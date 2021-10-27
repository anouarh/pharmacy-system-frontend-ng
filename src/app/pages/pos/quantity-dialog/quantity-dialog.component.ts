import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesOrderItem } from 'src/app/models/salesorderitem.model';

@Component({
  selector: 'app-quantity-dialog',
  templateUrl: './quantity-dialog.component.html',
  styleUrls: ['./quantity-dialog.component.css'],
})
export class QuantityDialogComponent implements OnInit {
  quantity: number = 1;

  constructor(
    public dialogRef: MatDialogRef<QuantityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderItem
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
