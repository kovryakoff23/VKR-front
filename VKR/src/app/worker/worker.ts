import {WorkerDetails} from "../worker-details/worker-details";

export class MyWorker {
  id : string;
  name : string;
  phoneNumber : string;
  numberAccount: string;
  bic: string;
  kpp: string;
  inn: string;
  status : string;
  workerDetails : Array<WorkerDetails>;
}
