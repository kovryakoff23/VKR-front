import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {WorkerDetails} from "./worker-details";
import {WorkerDetailsService} from "./worker-details.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.scss']
})
export class WorkerDetailsComponent implements OnInit {

//типы шаблонов
  @ViewChild('readOnlyTemplate', {static: false})
  readOnlyTemplate!: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false})
  editTemplate!: TemplateRef<any>|undefined;

  public editedWorkerDetails: WorkerDetails|null = null;
  public workerDetails: Array<WorkerDetails>;
  isNewRecord: boolean = false;
  isReadTemplate : boolean = true;
  isAdd : boolean = false;
  typeId : number;
  statusMessage: string = "";

  constructor(private serv: WorkerDetailsService, private _location: Location) {
    this.workerDetails = new Array<WorkerDetails>();
  }

  ngOnInit() {
    this.loadUsers();
  }

  backClicked() {
    this._location.back();
  }

  //загрузка пользователей
  private loadUsers() {
    this.serv.findAll().subscribe((data: Array<WorkerDetails>) => {
      this.workerDetails = data;
    });
  }

  // добавление пользователя
  public addUser() {
    this.editedWorkerDetails = new WorkerDetails("","","",0,"");
    this.workerDetails.push(this.editedWorkerDetails);
    this.isNewRecord = true;
    this.isReadTemplate = false;
  }

  // редактирование пользователя
  public editUser(workerDetail: WorkerDetails) {
    this.editedWorkerDetails = new WorkerDetails(workerDetail.id, workerDetail.namePosition,
      workerDetail.measure, workerDetail.priceOne, workerDetail.typeWork);
    this.isReadTemplate = false;
  }

  // загружаем один из двух шаблонов
  public loadTemplate(workerDetail: WorkerDetails) {
    if (this.editedWorkerDetails && this.editedWorkerDetails.id === workerDetail.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  public saveUser() {
      if (this.isNewRecord) {
        // добавляем пользователя
        this.serv.createUser(this.editedWorkerDetails as WorkerDetails).subscribe(data => {
          this.statusMessage = 'Данные успешно добавлены',
            this.loadUsers();
        });
        this.isNewRecord = false;
        this.editedWorkerDetails = null;
      } else {
        // изменяем пользователя
        this.serv.createUser(this.editedWorkerDetails as WorkerDetails).subscribe(data => {
          this.statusMessage = 'Данные успешно обновлены',
            this.loadUsers();
        });
        this.editedWorkerDetails = null;
      }
    this.isReadTemplate=true;
  }
  // отмена редактирования
  public cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.workerDetails.pop();
      this.isNewRecord = false;
      this.isReadTemplate=true;
    }
    this.editedWorkerDetails = null;
  }
  // удаление пользователя
  public deleteUser(workerDetail: WorkerDetails) {
    console.log(workerDetail.id);
    this.serv.deleteUser(workerDetail.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены'
        this.loadUsers();
    });
  }
}
