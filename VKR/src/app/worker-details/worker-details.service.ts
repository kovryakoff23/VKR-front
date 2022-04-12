import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkerDetails} from "./worker-details";
import {MyWorker} from "../worker/worker";
import {WorkerService} from "../worker/worker.service";


@Injectable({
  providedIn: 'root'
})
export class WorkerDetailsService {
  workerDetails : WorkerDetails[];
  private unitsUrl: string;
  workerId : string;
  worker : MyWorker;

  constructor(private workerService : WorkerService, private http: HttpClient) {
    this.unitsUrl = 'http://localhost:8090/workerDetails';
    this.workerId = workerService.getId();
  }
  public find(id: string): Observable<WorkerDetails>{
    return this.http.get<WorkerDetails>(this.unitsUrl + '/byId/' + id);
  }
  public findAll(): Observable<WorkerDetails[]> {
    this.workerId = this.workerService.getId();
    return this.http.get<WorkerDetails[]>(this.unitsUrl + '/' + this.workerId);
  }
  findAllById(workId:string){
    return this.http.get<WorkerDetails[]>(this.unitsUrl + '/'  + workId);
  }
  createUser(workerDetails: WorkerDetails){
    workerDetails.worker = this.workerService.getWorker();
    return this.http.post<WorkerDetails>(this.unitsUrl, workerDetails);
  }

  deleteUser(id: string){
    return this.http.delete<WorkerDetails>(this.unitsUrl + '/' + id);
  }
}
