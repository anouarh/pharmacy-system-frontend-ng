import { InventoryItem } from './inventoryitem.model';

export class SalesOrderItem {
  constructor(
    public quantity: number,
    public unitPrice: number,
    public inventoryItem: InventoryItem
  ) {}
}
