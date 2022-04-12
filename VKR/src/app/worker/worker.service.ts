import { Injectable } from '@angular/core';
import {UnitProduction} from "../unit-productions/unit-production";
import {UnitService} from "../unit/unit-service.service";
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyWorker} from "./worker";
import {WorkerDetails} from "../worker-details/worker-details";
import {Unit} from "../unit/unit";
import {Salary} from "./salary";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private unitsUrl: string;
  workerId: string;
  worker: MyWorker = new MyWorker();
  private _dateStartSalary : Date;
  private _dateEndSalary : Date;

  constructor(private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/workers';
  }

  get dateStartSalary(): Date|undefined {
    return this._dateStartSalary;
  }

  set dateStartSalary(value: Date) {
    this._dateStartSalary = value;
  }

  get dateEndSalary(): Date|undefined {
    return this._dateEndSalary;
  }

  set dateEndSalary(value: Date) {
    this._dateEndSalary = value;
  }

  public setWorker(worker: MyWorker) {
    this.worker = worker;
  }

  public getWorker() {
    return this.worker;
  }

  public getId() {
    return this.workerId;
  }

  public setId(id: string) {
    this.workerId = id;
  }
  public find(id: string): Observable<MyWorker>{
    return this.http.get<MyWorker>(this.unitsUrl + '/' + id);
  }
  public findAll(): Observable<MyWorker[]> {
    return this.http.get<MyWorker[]>(this.unitsUrl);
  }

  public save(worker: MyWorker) {
    return this.http.post<MyWorker>(this.unitsUrl, worker);
  }

  deleteWorker(id: string) {
    return this.http.delete<MyWorker>(this.unitsUrl + '/' + id);
  }
  public findAllSearch(search:string): Observable<MyWorker[]> {
    return this.http.get<MyWorker[]>(this.unitsUrl+"/search/"+search);
  }
  public findSalaryByDate(dateStartSalary : Date, dateEndSalary : Date): Observable<Salary[]> {
    this._dateStartSalary=dateStartSalary;
    this._dateEndSalary=dateEndSalary;
    const options =
      { params: new HttpParams().set('dateStartSalary', dateStartSalary.toString()).set("dateEndSalary", dateEndSalary.toString()) };
    return this.http.get<Salary[]>(this.unitsUrl+'Salar/', options);
  }
  public findAllSalary(): Observable<Salary[]> {
    return this.http.get<Salary[]>(this.unitsUrl+'Salary');
  }
}
