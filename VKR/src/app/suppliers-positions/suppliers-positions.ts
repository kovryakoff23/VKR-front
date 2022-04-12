import {Suppliers} from "../suppliers/suppliers";

export class SuppliersPositions{
  id : string;
  namePosition : string;
  measure : string;
  priceOne : number;
  suppliers: Suppliers =  new Suppliers();

  constructor(id: string, namePosition: string, measure: string, priceOne: number) {
    this.id = id;
    this.namePosition = namePosition;
    this.measure = measure;
    this.priceOne = priceOne;
  }
}
