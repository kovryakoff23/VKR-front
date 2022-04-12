import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Suppliers} from "../suppliers/suppliers";
import {SuppliersService} from "../suppliers/suppliers.service";
import {SuppliersPositions} from "./suppliers-positions";

@Injectable({
  providedIn: 'root'
})
export class SuppliersPositionsService {
  private unitsUrl: string;
  supplierId : string;
  supplier : Suppliers;

  constructor(private suppliersService : SuppliersService, private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/suppliersPositions';
    this.supplierId = suppliersService.getId();
    console.log("this.supplierId = "+this.supplierId);
  }
  public find(id: string): Observable<SuppliersPositions>{
    return this.http.get<SuppliersPositions>(this.unitsUrl + '/byId/' + id);
  }
  public findAll(): Observable<SuppliersPositions[]> {
    this.supplierId = this.suppliersService.getId();
    console.log("this.supplierId = "+this.supplierId);
    return this.http.get<SuppliersPositions[]>(this.unitsUrl+ '/' + this.supplierId);
  }
  findAllById(supplierId:string){
    return this.http.get<SuppliersPositions[]>(this.unitsUrl + '/' + supplierId);
  }
  createSuppliersPositions(suppliersPositions: SuppliersPositions){
    suppliersPositions.suppliers = this.suppliersService.getSupplier();
    return this.http.post<SuppliersPositions>(this.unitsUrl, suppliersPositions);
  }

  deleteUser(id: string){
    return this.http.delete<SuppliersPositions>(this.unitsUrl + '/' + id);
  }
}
