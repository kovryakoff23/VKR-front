import {Unit} from "../unit/unit";

export class UnitUpkeep{
  id: string;
  name: string;
  price:number;
  note :string;
  unit: Unit = new Unit();

  constructor(id: string, name: string, price: number, note: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.note = note;
  }
}
