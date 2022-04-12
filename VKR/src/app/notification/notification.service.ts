import { Injectable } from '@angular/core';
import {Suppliers} from "../suppliers/suppliers";
import {SuppliersService} from "../suppliers/suppliers.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SuppliersPositions} from "../suppliers-positions/suppliers-positions";
import {Notification} from "./notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private unitsUrl: string;

  constructor(private suppliersService : SuppliersService, private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/notification';
  }
  public find(id: string): Observable<Notification>{
    return this.http.get<Notification>(this.unitsUrl + '/byId/' + id);
  }
  public findAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.unitsUrl);
  }
  // findAllById(supplierId:string){
  //   return this.http.get<SuppliersPositions[]>(this.unitsUrl + '/' + supplierId);
  // }
  // createSuppliersPositions(suppliersPositions: SuppliersPositions){
  //   suppliersPositions.suppliers = this.suppliersService.getSupplier();
  //   return this.http.post<SuppliersPositions>(this.unitsUrl, suppliersPositions);
  // }

  deleteUser(id: string){
    return this.http.delete<Notification>(this.unitsUrl + '/' + id);
  }
}
