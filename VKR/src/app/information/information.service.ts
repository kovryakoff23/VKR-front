import { Injectable } from '@angular/core';
import {Unit} from "../unit/unit";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UnitDocumentation} from "../unit-info/unit-documentation";
import {InfoReport} from "./info-report";

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  filesUrl: string;
  constructor(private http: HttpClient) {
    this.filesUrl="http://localhost:8090/information/";
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.filesUrl}`);
  }
  public loadReports(): Observable<InfoReport> {
    return this.http.get<InfoReport>(this.filesUrl+"/reports");
  }
}
