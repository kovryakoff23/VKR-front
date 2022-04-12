export class Information{
  nameOrganization : string;
  fullNameOrganization : string;
  postcode: string;
  subject: string;
  city: string;
  street: string;
  building: string;
  KPP: string;
  INN: string;
  RegistrationNumber: string;
  dateRegistration: Date;
  phoneNumber: string;

  constructor(nameOrganization: string, fullNameOrganization: string, postcode: string, subject: string, city: string, street: string, building: string, KPP: string, INN: string, RegistrationNumber: string, dateRegistration: Date, phoneNumber: string) {
    this.nameOrganization = nameOrganization;
    this.fullNameOrganization = fullNameOrganization;
    this.postcode = postcode;
    this.subject = subject;
    this.city = city;
    this.street = street;
    this.building = building;
    this.KPP = KPP;
    this.INN = INN;
    this.RegistrationNumber = RegistrationNumber;
    this.dateRegistration = dateRegistration;
    this.phoneNumber = phoneNumber;
  }
}
