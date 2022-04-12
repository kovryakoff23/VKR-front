import { Injectable } from '@angular/core';
import {UnitDeliveriesPositions} from "../unit-deliver/unit-deliveries-positions";
import {UnitService} from "../unit/unit-service.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UnitDeliveries} from "./unit-deliveries";
import {Unit} from "../unit/unit";
@Injectable({
  providedIn: 'root'
})
export class UnitDeliveriesService {

  private unitsUrl: string;
  unitId : number;
  deliverId : string;
  deliver : UnitDeliveries = new UnitDeliveries();

  constructor(private unitService: UnitService, private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/units/deliveries';
    this.unitId = unitService.getId();
  }
  public setDeliver(deliver: UnitDeliveries){
    this.deliver=deliver;
  }
  public getDeliver(){
    return this.deliver;
  }
  public getId (){
    return this.deliverId;
  }
  public setId(id: string){
    this.deliverId = id;
  }
  public findAll(): Observable<UnitDeliveries[]> {
    this.unitId = this.unitService.getId();
    return this.http.get<UnitDeliveries[]>(this.unitsUrl+ '/' + this.unitId);
  }
  public save(unitDeliver : UnitDeliveries) {
    unitDeliver.dateCreate = new Date();
    unitDeliver.unit.id = this.unitId;
    return this.http.post<UnitDeliveries>(this.unitsUrl, unitDeliver);
  }
  public update(unitDeliver : UnitDeliveries){
    unitDeliver.unit.id = this.unitId;
    return this.http.put<UnitDeliveries>(this.unitsUrl, unitDeliver);
  }

  deleteUser(id: string){
    return this.http.delete<UnitDeliveries>(this.unitsUrl + '/' + id);
  }
}
