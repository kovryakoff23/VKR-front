import {Unit} from "../unit/unit";

export class UnitDeliveries {
  id : string;
  name : string;
  dateComplete : Date;
  dateCreate : Date;
  description : string;
  status : boolean;
  unit : Unit = new Unit();

}
