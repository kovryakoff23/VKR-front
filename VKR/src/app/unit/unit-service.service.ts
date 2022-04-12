import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Unit} from "./unit";
import {Observable} from "rxjs";
import {UnitProduction} from "../unit-productions/unit-production";


@Injectable()
export class UnitService{

  private unitsUrl: string;
  public id: number;

  constructor(private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/units/';
  }
  public setId(id: number){
    this.id=id;
  }
  public getId(){
    return this.id;
  }
  public findDocumentations(){
    return this.http.get<File[]>(this.unitsUrl+'getDocumentation/'+this.id);
  }
  public findAll(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.unitsUrl);
  }
  public find(): Observable<Unit> {
    return this.http.get<Unit>(this.unitsUrl+this.id)
  }
  public save(unit: Unit) {
    unit.type=true;
    return this.http.post<Unit>(this.unitsUrl, unit);
  }
  public findAllSearch(search:string): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.unitsUrl+"search/"+search);
  }
  delete(id: number) {
    return this.http.delete<Unit>(this.unitsUrl + '/' + id);
  }
}
