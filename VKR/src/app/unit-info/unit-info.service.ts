import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Unit} from "../unit/unit";
import {UnitDocumentation} from "./unit-documentation";
import {UnitService} from "../unit/unit-service.service";

@Injectable({
  providedIn: 'root'
})

export class UnitInfoService {

  private unitsUrl: string;
  private _id: number;
   file: File;

  constructor(private http: HttpClient,private unitService :UnitService) {
    this.unitsUrl = 'http://localhost:8090';
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  public findDocumentations(){
    return this.http.get<File[]>(this.unitsUrl+'getDocumentation/'+this._id);
  }
  public findAll(): Observable<UnitDocumentation[]> {
    return this.http.get<UnitDocumentation[]>(this.unitsUrl);
  }
  public find(): Observable<Unit> {
    return this.http.get<Unit>(this.unitsUrl+'/'+this._id)
  }
  public findAllSearch(search:string): Observable<UnitDocumentation[]> {
    return this.http.get<UnitDocumentation[]>(this.unitsUrl+"search/"+search);
  }
  upload(file: File, unit: Unit): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('unitId', unit.id.toString());
    const req = new HttpRequest('POST', `${this.unitsUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getFiles(unit: Unit): Observable<any> {
    console.log("getFiles "+ unit.id);
    return this.http.get(`${this.unitsUrl}/filesById/`+unit.id);
  }
}
