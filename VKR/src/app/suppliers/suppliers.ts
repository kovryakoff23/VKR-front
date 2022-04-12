import {SuppliersPositions} from "../suppliers-positions/suppliers-positions";

export class Suppliers {
  id : string;
  name : string;
  numberAccount: string;
  bic: string;
  kpp: string;
  inn: string;
  address : string;
  contactPhoneNumber : string;
  email : string;
  suppliersPositions :Array<SuppliersPositions>;
}
