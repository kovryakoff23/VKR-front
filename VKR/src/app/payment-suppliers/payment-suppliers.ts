import {MyWorker} from "../worker/worker";
import {Suppliers} from "../suppliers/suppliers";

export class PaymentSuppliers {
  id : string;
  datePay : Date;
  dateExecution: Date|null;
  unitName : string;
  namePosition : string;
  status : boolean ;
  statusExecution : boolean;
  sumPay: number;
  suppliers: Suppliers = new Suppliers();


  constructor(id: string, datePay: Date, dateExecution: Date | null, unitName: string, namePosition: string, status: boolean, statusExecution: boolean, sumPay: number) {
    this.id = id;
    this.datePay = datePay;
    this.dateExecution = dateExecution;
    this.unitName = unitName;
    this.namePosition = namePosition;
    this.status = status;
    this.statusExecution = statusExecution;
    this.sumPay = sumPay;
  }
}
