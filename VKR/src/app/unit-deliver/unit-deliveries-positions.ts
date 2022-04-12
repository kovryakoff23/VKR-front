import {UnitDeliveries} from "../unit-deliveries/unit-deliveries";
import {Suppliers} from "../suppliers/suppliers";

export class UnitDeliveriesPositions {
  id : string;
  namePosition : string;
  measure: string;
  quantity : number;
  priceOne : number;
  price  : number;
  status : boolean;
  unitDeliveries :  UnitDeliveries = new UnitDeliveries();
  suppliers : Suppliers = new Suppliers();

  constructor(id: string, namePosition: string, measure: string, quantity: number, priceOne: number, price: number, status :boolean) {
    this.id = id;
    this.namePosition = namePosition;
    this.measure = measure;
    this.quantity = quantity;
    this.priceOne = priceOne;
    this.price = price;
    this.status =status;
  }
}
