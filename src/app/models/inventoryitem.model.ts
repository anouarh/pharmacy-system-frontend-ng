import { Drug } from './drug.model';

export class InventoryItem {
  quantityOnHand: number;
  barcode: number;
  drug: Drug;
}
