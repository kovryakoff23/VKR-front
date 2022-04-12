import {UnitProduction} from "../unit-productions/unit-production";
import {MyWorker} from "../worker/worker";

export class WorkerDetails{
  id : string;
  namePosition : string;
  measure : string;
  priceOne : number;
  worker: MyWorker = new MyWorker();
  typeWork: string;


  constructor(id: string, namePosition: string, measure: string, priceOne: number, typeWork: string) {
    this.id = id;
    this.namePosition = namePosition;
    this.measure = measure;
    this.priceOne = priceOne;
    this.typeWork=typeWork;
  }

}
