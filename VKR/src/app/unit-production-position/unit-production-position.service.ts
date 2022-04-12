import { Injectable } from '@angular/core';
import {UnitDeliveriesPositions} from "../unit-deliver/unit-deliveries-positions";
import {UnitDeliveriesService} from "../unit-deliveries/unit-deliveries.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UnitProductionPosition} from "./unit-production-position";
import {UnitDeliveries} from "../unit-deliveries/unit-deliveries";
import {UnitProductionsService} from "../unit-productions/unit-productions.service";
import {MyWorker} from "../worker/worker";

@Injectable({
  providedIn: 'root'
})
export class UnitProductionPositionService {
  unitProductionPositions : UnitProductionPosition[];
  private unitsUrl: string;
  deliverId : string;
  unitProduction : UnitDeliveries;
  worker : MyWorker = new MyWorker();

  public setWorker(worker:MyWorker){
    this.worker=worker;
  }
  constructor(private unitProductionsService : UnitProductionsService, private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/units/productionPosition';
    this.deliverId = unitProductionsService.getId();
  }
  public find(): Observable<UnitProductionPosition>{
    return this.http.get<UnitProductionPosition>(this.unitsUrl+'/' + this.deliverId);
  }
  public findByUnitId(unitId: number): Observable<MyWorker[]>{
    return this.http.get<MyWorker[]>(this.unitsUrl + '/byUnitId/' + unitId);
  }
  public findAll(): Observable<UnitProductionPosition[]> {
    this.deliverId = this.unitProductionsService.getId();
    return this.http.get<UnitProductionPosition[]>(this.unitsUrl+ '/' + this.deliverId);
  }
  createProductionPosition(unitProductionPosition: UnitProductionPosition){
    unitProductionPosition.worker=this.worker;
    unitProductionPosition.unitProductionWorks = this.unitProductionsService.getProduction();
    unitProductionPosition.price=unitProductionPosition.priceOne*unitProductionPosition.quantity;
    return this.http.post<UnitProductionPosition>(this.unitsUrl, unitProductionPosition);
  }
  updateStatus(unitProductionPosition: UnitProductionPosition){
  unitProductionPosition.worker=this.worker;
  unitProductionPosition.unitProductionWorks = this.unitProductionsService.getProduction();
  unitProductionPosition.price=unitProductionPosition.priceOne*unitProductionPosition.quantity;
  return this.http.put<UnitProductionPosition>(this.unitsUrl, unitProductionPosition);
}
  deleteProductionPosition(id: string){
    console.log("delete")
    console.log(id)
    return this.http.delete<UnitProductionPosition>(this.unitsUrl + '/' + id);
  }
}
