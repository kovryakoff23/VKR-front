import { Injectable } from '@angular/core';
import {WorkerService} from "../worker/worker.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SalaryWorker} from "./salary-worker";

@Injectable({
  providedIn: 'root'
})
export class SalaryWorkerService {
  salaryWorkers : SalaryWorker[];
  private unitsUrl: string;
  workerId : string;

  constructor(private workerService : WorkerService, private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/worker/salary';
    this.workerId = workerService.getId();
  }
  public find(id: string): Observable<SalaryWorker>{
    return this.http.get<SalaryWorker>(this.unitsUrl + '/byId/' + id);
  }
  public findAll(): Observable<SalaryWorker[]> {
    this.workerId = this.workerService.getId();
    console.log("this.workerId = "+this.workerId);
    return this.http.get<SalaryWorker[]>(this.unitsUrl + '/' + this.workerId);
  }
  public findAllByDate(): Observable<SalaryWorker[]> {
    console.log("this.workerService.dateStartSalary = "+this.workerService.dateStartSalary);
    if ( this.workerService.dateStartSalary!=undefined && this.workerService.dateEndSalary!=undefined) {
      const options =
        {
          params: new HttpParams()
            .set('dateStartSalary', this.workerService.dateStartSalary.toString())
            .set("dateEndSalary", this.workerService.dateEndSalary.toString())
            .set("workerId", this.workerService.getId())
        };
      return this.http.get<SalaryWorker[]>(this.unitsUrl + '/', options);
    }
    return this.findAll();
  }

  createSalary(salaryWorker: SalaryWorker){
    salaryWorker.worker = this.workerService.getWorker();
    return this.http.post<SalaryWorker>(this.unitsUrl+'/', salaryWorker);
  }
  deleteSalary(id: string){
    return this.http.delete<SalaryWorker>(this.unitsUrl + '/' + id);
  }
  public updateStatusSalary(salaryWorker: SalaryWorker){
    if(salaryWorker.statusExecution) {
      salaryWorker.statusExecution = false;
      salaryWorker.status=true;
    }
    else {
      salaryWorker.dateExecution = new Date();
      salaryWorker.statusExecution = true;
      salaryWorker.status=false;
    }
    console.log("updateStatusSalary");
    return this.http.put<SalaryWorker>(this.unitsUrl+'/', salaryWorker);
  }
}
