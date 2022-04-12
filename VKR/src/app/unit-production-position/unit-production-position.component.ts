import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UnitDeliveriesPositions} from "../unit-deliver/unit-deliveries-positions";
import {UnitDeliverService} from "../unit-deliver/unit-deliver.service";
import {UnitProductionPosition} from "./unit-production-position";
import {UnitProductionPositionService} from "./unit-production-position.service";
import {MyWorker} from "../worker/worker";
import {WorkerService} from "../worker/worker.service";
import {WorkerDetails} from "../worker-details/worker-details";
import {WorkerDetailsService} from "../worker-details/worker-details.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData, DialogWorkerComponent} from "../dialog-worker/dialog-worker.component";
import * as XLSX from "xlsx";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-unit-production-position',
  templateUrl: './unit-production-position.component.html',
  styleUrls: ['./unit-production-position.component.scss'],
})
export class UnitProductionPositionComponent implements OnInit {
//типы шаблонов
  @ViewChild('readOnlyTemplate', {static: false})
  readOnlyTemplate!: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false})
  editTemplate!: TemplateRef<any>|undefined;
  @ViewChild("table") table: ElementRef;

  public editedProductionPosition: UnitProductionPosition|null = null;
  public unitProductionPositions: Array<UnitProductionPosition>;
  public works : Array<MyWorker>;
  public workerId: string;
  public worker: MyWorker;
  isNewRecord: boolean = false;
  flagType: boolean = false;
  workerDetails : Array<WorkerDetails>;
  statusMessage: string = "";
  workerDetail : WorkerDetails = new WorkerDetails("","","",0,"");

  constructor(private serv: UnitProductionPositionService, private workerService : WorkerService
  , private workerDetailsService : WorkerDetailsService,public dialog: MatDialog, private router: Router,
              private _location: Location) {
    this.worker = new MyWorker();
    this.unitProductionPositions = new Array<UnitProductionPosition>();
    this.works = new Array<MyWorker>();
    this.workerDetails = new Array<WorkerDetails>();
  }

  backClicked() {
    this._location.back();
  }

  fireEvent()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Позиции заявки поставок.xlsx');

  }
  openDialog(id: string): void {
    this.workerDetailsService.findAllById(id).subscribe((data: Array<WorkerDetails>) => {
      this.workerDetails = data;
      this.workerService.find(id).subscribe((data1: MyWorker) => {
        this.worker = data1;
    const dialogRef = this.dialog.open(DialogWorkerComponent, {
      width: 'auto',
      height: 'auto',
      data: {worker: this.worker, workerDetails: this.workerDetails},
        });
      dialogRef.afterClosed().subscribe((result)=> {
        if(result != undefined) {
          this.workerDetailsService.find(result as string).subscribe((data: WorkerDetails) => {
            this.flagType = true;
            this.workerDetail = data;
            if (this.editedProductionPosition instanceof UnitProductionPosition) {
              this.editedProductionPosition.priceOne = this.workerDetail.priceOne;
              this.editedProductionPosition.measure = this.workerDetail.measure;
            }
          });
        }
        else {
          this.flagType = false;
        }
        });
      });
    });
  }
  ngOnInit() {
    this.loadProductionPosition();
  }

  private loadWorker(){
    this.workerService.findAll().subscribe((data: Array<MyWorker>) => {
      this.works = data;
      });
  }

  private loadProductionPosition() {
    this.loadWorker();
    this.serv.findAll().subscribe((data: Array<UnitProductionPosition>) => {
      this.unitProductionPositions = data;
      },
      (error) => {
        this.router.navigate(['home/units']);
        console.log("error")
    });
  }

  public addProductionPosition() {
    this.editedProductionPosition = new UnitProductionPosition("","","",0,0,0, true);
    this.unitProductionPositions.push(this.editedProductionPosition);
    this.isNewRecord = true;
  }

  public editProductionPosition(unitProductionPosition: UnitProductionPosition) {
    this.editedProductionPosition = new UnitProductionPosition(unitProductionPosition.id, unitProductionPosition.namePosition,
      unitProductionPosition.measure, unitProductionPosition.quantity,
      unitProductionPosition.priceOne, unitProductionPosition.price, unitProductionPosition.status);
  }

  public loadTemplate(unitProductionPosition: UnitProductionPosition) {
    if (this.editedProductionPosition && this.editedProductionPosition.id === unitProductionPosition.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  public saveProductionPosition() {
    this.workerService.find(this.workerId).subscribe( (data:MyWorker) => {
      this.serv.setWorker(data);
      this.flagType=false;
    if (this.isNewRecord) {
      this.serv.createProductionPosition(this.editedProductionPosition as UnitProductionPosition).subscribe(data => {
        this.statusMessage = 'Данные успешно добавлены',
          this.loadProductionPosition();
      });
      this.isNewRecord = false;
      this.editedProductionPosition = null;
    } else {
      this.serv.createProductionPosition(this.editedProductionPosition as UnitProductionPosition).subscribe(data => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadProductionPosition();
      });
      this.editedProductionPosition = null;
    }
    });
  }
  public updateStatus(unitProductionPosition : UnitProductionPosition){
    if(unitProductionPosition.status) {
      unitProductionPosition.status = false;
      this.serv.updateStatus(unitProductionPosition).subscribe(result =>
        this.loadProductionPosition());

    }
    else{
      unitProductionPosition.status = true;
      this.serv.updateStatus(unitProductionPosition).subscribe(result =>
        this.loadProductionPosition());
    }
  }
  // отмена редактирования
  public cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.unitProductionPositions.pop();
      this.isNewRecord = false;
    }
    this.editedProductionPosition = null;
  }
  // удаление пользователя
  public deleteProductionPosition(unitProductionPosition: UnitProductionPosition) {
    console.log(unitProductionPosition.id);
    this.serv.deleteProductionPosition(unitProductionPosition.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadProductionPosition();
    });
  }

}
