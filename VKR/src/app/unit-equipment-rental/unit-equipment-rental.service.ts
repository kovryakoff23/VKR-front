import { Injectable } from '@angular/core';
import {UnitProductionPosition} from "../unit-production-position/unit-production-position";
import {UnitDeliveries} from "../unit-deliveries/unit-deliveries";
import {MyWorker} from "../worker/worker";
import {UnitProductionsService} from "../unit-productions/unit-productions.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UnitEquipmentRental} from "./unit-equipment-rental";
import {UnitService} from "../unit/unit-service.service";

@Injectable({
  providedIn: 'root'
})
export class UnitEquipmentRentalService {

  private unitsUrl: string;
  unitId: number;
  unitEquipmentRental : UnitEquipmentRental;

  constructor(private unitService : UnitService, private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/units/unitEquipmentRental';
  }
  public find(): Observable<UnitEquipmentRental>{
    this.unitId = this.unitService.getId();
    return this.http.get<UnitEquipmentRental>(this.unitsUrl+'/' + this.unitId);
  }

  public findAll(): Observable<UnitEquipmentRental[]> {
    this.unitId = this.unitService.getId();
    return this.http.get<UnitEquipmentRental[]>(this.unitsUrl+ '/' + this.unitId);
  }
  createUser(unitEquipmentRental: UnitEquipmentRental){
    unitEquipmentRental.unit.id=this.unitService.getId();
    return this.http.post<UnitEquipmentRental>(this.unitsUrl, unitEquipmentRental);
  }

  deleteUser(id: string){
    console.log("delete")
    console.log(id)
    return this.http.delete<UnitEquipmentRental>(this.unitsUrl + '/' + id);
  }
}
