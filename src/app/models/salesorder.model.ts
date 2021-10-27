import { SalesOrderItem } from './salesorderitem.model';

export class SalesOrder {
  constructor(
    public orderDate: Date,
    public salesOrderItems: SalesOrderItem[]
  ) {}
}
