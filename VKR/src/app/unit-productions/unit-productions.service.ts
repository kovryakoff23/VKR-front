import { Injectable } from '@angular/core';
import {UnitDeliveries} from "../unit-deliveries/unit-deliveries";
import {UnitService} from "../unit/unit-service.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UnitProduction} from "./unit-production";
import {MyWorker} from "../worker/worker";

@Injectable({
  providedIn: 'root'
})
export class UnitProductionsService {

  private unitsUrl: string;
  unitId: number;
  productionId: string;
  production: UnitProduction = new UnitProduction();


  constructor(private unitService: UnitService, private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/units/production';
    this.unitId = unitService.getId();
  }

  public setProduction(production: UnitProduction) {
    this.production = production;
  }

  public getProduction() {
    return this.production;
  }

  public getId() {
    return this.productionId;
  }

  public setId(id: string) {
    this.productionId = id;
  }

  public findAll(): Observable<UnitProduction[]> {
    this.unitId = this.unitService.getId();
    return this.http.get<UnitProduction[]>(this.unitsUrl + '/' + this.unitId);
  }

  public save(unitProduction: UnitProduction) {
    unitProduction.unit.id = this.unitId;
    unitProduction.status=false;
    return this.http.post<UnitProduction>(this.unitsUrl, unitProduction);
  }
  public update(unitProduction: UnitProduction) {
    unitProduction.unit.id = this.unitId;
    return this.http.post<UnitProduction>(this.unitsUrl, unitProduction);
  }
  deleteUser(id: string) {
    return this.http.delete<UnitProduction>(this.unitsUrl + '/' + id);
  }
}
