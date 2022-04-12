import { Injectable } from '@angular/core';
import {UnitDeliveriesPositions} from "../unit-deliver/unit-deliveries-positions";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Unit} from "../unit/unit";
import {Reports} from "./reports";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private unitsUrl: string;


  constructor(private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/units/reports';
  }
  public find(unit : Unit): Observable<Reports>{
    return this.http.get<Reports>(this.unitsUrl+ '/' + unit.id)
  }
}
