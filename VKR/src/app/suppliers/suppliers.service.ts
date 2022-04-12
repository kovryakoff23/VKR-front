import { Injectable } from '@angular/core';
import {MyWorker} from "../worker/worker";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Suppliers} from "./suppliers";
import {Unit} from "../unit/unit";
import {Salary} from "../worker/salary";
import {Payment} from "./payment";
import {PaymentSuppliers} from "../payment-suppliers/payment-suppliers";

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private unitsUrl: string;
  supplierId: string;
  suppliers: Suppliers = new Suppliers();
  private _dateStartPay : Date;
  private _dateEndPay : Date;

  constructor(private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/suppliers';
  }
  get dateStartPay(): Date|null {
    return this._dateStartPay;
  }

  set dateStartPay(value: Date) {
    this._dateStartPay = value;
  }

  get dateEndPay(): Date|null  {
    return this._dateEndPay;
  }

  set dateEndPay(value: Date) {
    this._dateEndPay = value;
  }

  public setSupplier(suppliers: Suppliers) {
    this.suppliers = suppliers;
  }

  public getSupplier() {
    return this.suppliers;
  }

  public getId() {
    return this.supplierId;
  }

  public setId(id: string) {
    this.supplierId = id;
  }
  public find(id: string): Observable<Suppliers>{
    return this.http.get<Suppliers>(this.unitsUrl + '/' + id);
  }
  public findAll(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(this.unitsUrl);
  }

  public save(suppliers: Suppliers) {
    return this.http.post<Suppliers>(this.unitsUrl, suppliers);
  }

  deleteSupplier(id: string) {
    return this.http.delete<Suppliers>(this.unitsUrl + '/' + id);
  }
  public findAllSearch(search:string): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(this.unitsUrl+"/search/"+search);
  }
  public findByDate(dateStartPay : Date, dateEndPay : Date): Observable<Payment[]> {
    this._dateStartPay=dateStartPay;
    this._dateEndPay=dateEndPay;
    const options =
      { params: new HttpParams().set('dateStartPay', dateStartPay.toString()).set("dateEndPay", dateEndPay.toString()) };
    return this.http.get<Payment[]>(this.unitsUrl+'Payment/', options);
  }
  public findAllPayment(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.unitsUrl+'Payment');
  }
}
