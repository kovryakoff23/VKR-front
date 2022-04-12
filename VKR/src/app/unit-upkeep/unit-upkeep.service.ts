import { Injectable } from '@angular/core';
import {UnitEquipmentRental} from "../unit-equipment-rental/unit-equipment-rental";
import {UnitService} from "../unit/unit-service.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UnitUpkeep} from "./unit-upkeep";

@Injectable({
  providedIn: 'root'
})
export class UnitUpkeepService {

  private unitsUrl: string;
  unitId: number;

  constructor(private unitService : UnitService, private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/units/upkeep';
  }
  public find(): Observable<UnitUpkeep>{
    this.unitId = this.unitService.getId();
    return this.http.get<UnitUpkeep>(this.unitsUrl+'/' + this.unitId);
  }

  public findAll(): Observable<UnitUpkeep[]> {
    this.unitId = this.unitService.getId();
    return this.http.get<UnitUpkeep[]>(this.unitsUrl+ '/' + this.unitId);
  }
  createUser(unitUpkeep: UnitUpkeep){
    this.unitId = this.unitService.getId();
    unitUpkeep.unit.id=this.unitService.getId();
    return this.http.post<UnitUpkeep>(this.unitsUrl, unitUpkeep);
  }

  deleteUser(id: string){
    return this.http.delete<UnitUpkeep>(this.unitsUrl + '/' + id);
  }
}
