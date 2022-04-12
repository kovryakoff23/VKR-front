import {MyWorker} from "../worker/worker";
import {UnitProductionPosition} from "../unit-production-position/unit-production-position";

export class SalaryWorker{
  id : string;
  dateSalary : Date;
  dateExecution: Date|null;
  unitName : string;
  namePosition : string;
  status : boolean;
  statusExecution : boolean;
  sumSalary: number;
  worker: MyWorker = new MyWorker();
  // unitProductionPosition: UnitProductionPosition|null

  constructor(id: string, dateSalary: Date, dateExecution: Date | null, unitName: string,
              namePosition: string, status: boolean, statusExecution: boolean, sumSalary: number) {
    this.id = id;
    this.dateSalary = dateSalary;
    this.dateExecution = dateExecution;
    this.unitName = unitName;
    this.namePosition = namePosition;
    this.status = status;
    this.statusExecution = statusExecution;
    this.sumSalary = sumSalary;
    // this.unitProductionPosition=unitProductionPosition;
  }
}
