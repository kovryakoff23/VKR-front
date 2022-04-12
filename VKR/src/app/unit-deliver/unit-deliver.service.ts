import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UnitDeliveriesPositions} from "./unit-deliveries-positions";
import {UnitDeliveriesService} from "../unit-deliveries/unit-deliveries.service";
import {UnitDeliveries} from "../unit-deliveries/unit-deliveries";
import {Suppliers} from "../suppliers/suppliers";
import * as XLSX from "xlsx";


@Injectable({
  providedIn: 'root'
})
export class UnitDeliverService {
  unitDeliversServices : UnitDeliveriesPositions[];
  private unitsUrl: string;
  deliverId : string;
  suppliers : Suppliers;

  public setSuppliers(suppliers : Suppliers){
    this.suppliers=suppliers;
  }
  constructor(private unitDeliveriesService : UnitDeliveriesService, private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/units/deliver';
    this.deliverId = unitDeliveriesService.getId();
  }
  public find(): Observable<UnitDeliveriesPositions>{
    this.deliverId = this.unitDeliveriesService.getId();
    return this.http.get<UnitDeliveriesPositions>(this.unitsUrl+ '/' + this.deliverId);
  }
  public findAll(): Observable<UnitDeliveriesPositions[]> {
    this.deliverId = this.unitDeliveriesService.getId();
    return this.http.get<UnitDeliveriesPositions[]>(this.unitsUrl+ '/' + this.deliverId);
  }
  createDeliveriesPositions(unitDeliversPosition: UnitDeliveriesPositions){
    unitDeliversPosition.suppliers=this.suppliers;
    unitDeliversPosition.unitDeliveries = this.unitDeliveriesService.getDeliver();
    unitDeliversPosition.price=unitDeliversPosition.priceOne*unitDeliversPosition.quantity;
    return this.http.post<UnitDeliveriesPositions>(this.unitsUrl, unitDeliversPosition);
  }
  updateStatus(unitDeliversPosition: UnitDeliveriesPositions){
    unitDeliversPosition.suppliers=this.suppliers;
    unitDeliversPosition.unitDeliveries = this.unitDeliveriesService.getDeliver();
    unitDeliversPosition.price=unitDeliversPosition.priceOne*unitDeliversPosition.quantity;
    return this.http.put<UnitDeliveriesPositions>(this.unitsUrl, unitDeliversPosition);
  }
  deleteDeliveriesPositions(id: string){
    return this.http.delete<UnitDeliveriesPositions>(this.unitsUrl + '/' + id);
  }
}
