import {Unit} from "../unit/unit";

export class UnitEquipmentRental{
  id: string;
  nameEquipment: string;
  dateUse : Date;
  price:number;
  note :string;
  unit: Unit = new Unit();

  constructor(id: string, nameEquipment: string, dateUse: Date, price: number, note: string) {
    this.id = id;
    this.nameEquipment = nameEquipment;
    this.dateUse = dateUse;
    this.price = price;
    this.note = note;
  }
}
