export class Product {
  total?: number;
  constructor(
    public id: number,
    public productName: string,
    public quantity: number,
    public pricePerUnit: number
  ) {
    this.total = quantity * pricePerUnit;
  }
}
