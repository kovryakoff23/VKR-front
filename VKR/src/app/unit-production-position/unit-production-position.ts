import {UnitProduction} from "../unit-productions/unit-production";
import {MyWorker} from "../worker/worker";
import {SalaryWorker} from "../salary-worker/salary-worker";

export class UnitProductionPosition{
  id : string;
  namePosition : string;
  priceOne : number;
  quantity : number;
  price : number;
  measure : string;
  status : boolean;
  unitProductionWorks: UnitProduction = new UnitProduction();
  worker : MyWorker = new MyWorker();

  constructor(id: string, namePosition: string, measure: string, quantity: number, priceOne: number, price: number, status: boolean) {
    this.id = id;
    this.namePosition = namePosition;
    this.measure = measure;
    this.quantity = quantity;
    this.priceOne = priceOne;
    this.price = price;
    this.status=status;
  }

}
