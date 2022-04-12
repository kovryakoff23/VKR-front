import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {SalaryWorker} from "./salary-worker";
import {SalaryWorkerService} from "./salary-worker.service";

@Component({
  selector: 'app-salary-worker',
  templateUrl: './salary-worker.component.html',
  styleUrls: ['./salary-worker.component.scss']
})
export class SalaryWorkerComponent implements OnInit {


//типы шаблонов
  @ViewChild('readOnlyTemplate', {static: false})
  readOnlyTemplate!: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false})
  editTemplate!: TemplateRef<any>|undefined;

  public editedSalaryWorker: SalaryWorker|null = null;
  public salaryWorkers: Array<SalaryWorker>;
  isNewRecord: boolean = false;
  isAdd : boolean = false;
  statusMessage: string = "";

  constructor(private serv: SalaryWorkerService, private _location: Location) {
  }

  ngOnInit() {
    this.loadSalary();
  }

  backClicked() {
    this._location.back();
  }

  //загрузка пользователей
  private loadSalary() {
    this.serv.findAllByDate().subscribe((data: Array<SalaryWorker>) => {
      this.salaryWorkers = data;
    });
  }

  // добавление пользователя
  public addSalary() {
    this.editedSalaryWorker = new SalaryWorker("",new Date(),null,
      "","",true,false, 0);
    this.salaryWorkers.push(this.editedSalaryWorker);
    this.isNewRecord = true;
  }


  public editSalary(salaryWorker: SalaryWorker) {
    this.editedSalaryWorker = new SalaryWorker(salaryWorker.id,salaryWorker.dateSalary,salaryWorker.dateExecution, salaryWorker.unitName,
      salaryWorker.namePosition, salaryWorker.status,salaryWorker.statusExecution, salaryWorker.sumSalary);
  }


  public loadTemplate(salaryWorker: SalaryWorker) {
    if (this.editedSalaryWorker && this.editedSalaryWorker.id === salaryWorker.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  public saveSalary() {
      if (this.isNewRecord) {
        // добавляем пользователя
        this.serv.createSalary(this.editedSalaryWorker as SalaryWorker).subscribe(data => {
          this.statusMessage = 'Данные успешно добавлены',
            this.loadSalary();
        });
        this.isNewRecord = false;
        this.editedSalaryWorker = null;
      } else {
        // изменяем пользователя
        this.serv.createSalary(this.editedSalaryWorker as SalaryWorker).subscribe(data => {
          this.statusMessage = 'Данные успешно обновлены',
            this.loadSalary();
        });
        this.editedSalaryWorker = null;
      }
  }
  // отмена редактирования
  public cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.salaryWorkers.pop();
      this.isNewRecord = false;
    }
    this.editedSalaryWorker = null;
  }
  // удаление пользователя
  public deleteSalary(salaryWorker: SalaryWorker) {
    console.log(salaryWorker.id);
    this.serv.deleteSalary(salaryWorker.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadSalary();
    });
  }
  public updateStatus(salaryWorker: SalaryWorker){
    this.serv.updateStatusSalary(salaryWorker).subscribe(data => {
        this.loadSalary()
    });
  }
}
