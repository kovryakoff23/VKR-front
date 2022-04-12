import {ActivatedRoute, Data} from "@angular/router";
import {UnitService} from "./unit-service.service";

export class Unit {
  id: number;
  name: string
  dateStart: Date;
  dateFinish: Date;
  address: string;
  nameOrganizationCustomer: string;
  contactPhoneNumber: string;
  responsibleForWork: string;
  type: boolean;

}
