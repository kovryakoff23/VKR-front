import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MyWorker} from "./worker";
import {WorkerService} from "./worker.service";
import {Salary} from "./salary";
import {WorkerDetails} from "../worker-details/worker-details";
import {DialogWorkerComponent} from "../dialog-worker/dialog-worker.component";
import {UnitProductionPosition} from "../unit-production-position/unit-production-position";
import {DialogDeleteComponent} from "../dialog-delete/dialog-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {SalaryWorkerService} from "../salary-worker/salary-worker.service";
import {SalaryWorker} from "../salary-worker/salary-worker";

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  myWorkers: Array<MyWorker>;
  myWorker: MyWorker;
  isAdd: boolean = false;
  search :string;
  dateStartSalary : Date;
  dateEndSalary : Date;
  salaries: Array<Salary>;
  salaryWorkers: Array<SalaryWorker>;
  message : string;
  constructor(private serv: WorkerService, private salaryWorkerService :SalaryWorkerService,
              private route: ActivatedRoute,public dialog: MatDialog, private router: Router) {
    this.myWorkers = new Array<MyWorker>();
    this.myWorker = new MyWorker();
    this.salaries = new Array<Salary>();
    this.salaries= new Array<Salary>();
    this.loadWorker();
  }
  public getSearch(){
    console.log(this.search)
    if(this.search != undefined && this.search !='' && this.search!=null) {
      this.serv.findAllSearch(this.search).subscribe(data => {
        this.myWorkers = data;
        console.log(data);
      });
    }
    else{
      this.serv.findAll().subscribe(data => {
        this.myWorkers = data;
        console.log(data);
      });
    }
  }
  findByDate(){
    this.serv.findSalaryByDate(this.dateStartSalary, this.dateEndSalary).subscribe(date=>{
      this.salaries=date;
    });
  }
  backClicked(){
    this.isAdd=false;
  }
  editWorker(worker: MyWorker){
    this.myWorker=worker;
    this.isAdd=true;
  }
  openDialog(myWorker: MyWorker) {
     this.message= "Вы действительно хотите удалить всю информацию об этом рабочем?";
        const dialogRef = this.dialog.open(DialogDeleteComponent, {
          width: 'auto',
          height: 'auto',
          data: {message: this.message},
        });
        dialogRef.afterClosed().subscribe((result)=> {
          console.log("result = "+result)
          if (result==true){
            this.serv.deleteWorker(myWorker.id).subscribe(value => {
              this.loadWorker();
            });
          }
        });
  }
  onSubmit() {
    if(this.isAdd){
    this.serv.save(this.myWorker).subscribe(result =>
      this.myWorkers);
    this.isAdd=false;
    location.reload();
    }
  }
  ngOnInit() {
    console.log("this.dateStartSalary = "+this.dateStartSalary)
    this.loadWorker();
  }
  //загрузка пользователей
  private loadWorker() {
    this.serv.findAll().subscribe((data: Array<MyWorker>) => {
      this.myWorkers = data;
      this.serv.findAllSalary().subscribe(data=>{
        this.salaries=data;
        this.salaryWorkerService.findAll().subscribe(data2=>{
          this.salaryWorkers=data2;
        })
      });
    });
  }
  public addWorker(){
    this.isAdd = true;
  }
  public openDetails(worker : MyWorker){
    this.serv.setId(worker.id);
    this.serv.setWorker(worker);
    console.log(this.serv.getId());
    this.router.navigate(['/home/worker-details']);
  }
  public openSalaryDetails(salary : Salary){
    this.serv.setId(salary.worker.id);
    this.serv.setWorker(salary.worker);
    console.log(this.serv.getId());
    this.router.navigate(['/home/salary-worker']);
  }

  public updateStatus(salaryWorker){
    this.salaryWorkerService.updateStatusSalary(salaryWorker).subscribe();
    this.loadWorker();
  }

}
