import {Unit} from "../unit/unit";

export class UnitProduction {
  id : string = "";
  dateStartWork : Date;
  dateEndWork : Date;
  nameWork : string;
  description : string = "";
  status: boolean;
  unit : Unit = new Unit();
}
