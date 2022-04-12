import { Injectable } from '@angular/core';
import {SalaryWorker} from "../salary-worker/salary-worker";
import {WorkerService} from "../worker/worker.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkerDetails} from "../worker-details/worker-details";
import {PaymentSuppliers} from "./payment-suppliers";
import {SuppliersService} from "../suppliers/suppliers.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentSuppliersService {

  paymentSuppliers : PaymentSuppliers[];
  private unitsUrl: string;
  supplierId : string;

  constructor(private suppliersService : SuppliersService, private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/suppliersPositions/payment';
    this.supplierId = suppliersService.getId();
  }
  public find(id: string): Observable<PaymentSuppliers>{
    return this.http.get<PaymentSuppliers>(this.unitsUrl + '/byId/' + id);
  }
  public findAll(): Observable<PaymentSuppliers[]> {
    this.supplierId = this.suppliersService.getId();
    return this.http.get<PaymentSuppliers[]>(this.unitsUrl + '/' + this.supplierId);
  }
  public findAllByDate(): Observable<PaymentSuppliers[]> {
    if ( this.suppliersService.dateStartPay!=undefined && this.suppliersService.dateEndPay!=undefined) {
      const options =
        {
          params: new HttpParams()
            .set('dateStartPay', this.suppliersService.dateStartPay.toString())
            .set("dateEndPay", this.suppliersService.dateEndPay.toString())
            .set("supplierId", this.suppliersService.getId())
        };
      return this.http.get<PaymentSuppliers[]>(this.unitsUrl + '/', options);
    }
    return this.findAll();
  }
  findAllById(workId:string){
    return this.http.get<PaymentSuppliers[]>(this.unitsUrl + '/'  + workId);
  }
  createPaymentSuppliers(paymentSupplier: PaymentSuppliers){
    paymentSupplier.suppliers = this.suppliersService.getSupplier();
    return this.http.post<PaymentSuppliers>(this.unitsUrl, paymentSupplier);
  }
  deletePaymentSuppliers(id: string){
    return this.http.delete<PaymentSuppliers>(this.unitsUrl + '/' + id);
  }
  public updateStatusPayment(paymentSuppliers: PaymentSuppliers){
    if(paymentSuppliers.statusExecution) {
      paymentSuppliers.statusExecution = false
      paymentSuppliers.status = true;
    }
    else {
      paymentSuppliers.dateExecution = new Date();
      paymentSuppliers.statusExecution = true;
      paymentSuppliers.status = false;
    }
    return this.http.put<PaymentSuppliers>(this.unitsUrl, paymentSuppliers);
  }

}
