import {ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UnitDeliveriesPositions} from "./unit-deliveries-positions";
import {UnitDeliverService} from "./unit-deliver.service";
import {WorkerDetails} from "../worker-details/worker-details";
import {MyWorker} from "../worker/worker";
import {Suppliers} from "../suppliers/suppliers";
import {SuppliersPositions} from "../suppliers-positions/suppliers-positions";
import {WorkerService} from "../worker/worker.service";
import {WorkerDetailsService} from "../worker-details/worker-details.service";
import {MatDialog} from "@angular/material/dialog";
import {SuppliersService} from "../suppliers/suppliers.service";
import {SuppliersPositionsService} from "../suppliers-positions/suppliers-positions.service";
import {UnitProductionPosition} from "../unit-production-position/unit-production-position";
import {DialogWorkerComponent} from "../dialog-worker/dialog-worker.component";
import {DialogDeliversComponent} from "../dialog-delivers/dialog-delivers.component";
import {Subscription} from "rxjs";
import * as XLSX from "xlsx";
import {Location} from "@angular/common";
import {UnitDeliveries} from "../unit-deliveries/unit-deliveries";
import {Router} from "@angular/router";

@Component({
  selector: 'app-unit-deliver',
  templateUrl: './unit-deliver.component.html',
  styleUrls: ['./unit-deliver.component.scss']
})
export class UnitDeliverComponent implements OnInit {

//типы шаблонов
  @ViewChild('readOnlyTemplate', {static: true})
  readOnlyTemplate!: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: true})
  editTemplate!: TemplateRef<any>|undefined;
  @ViewChild("table") table: ElementRef;

  public editedDeliveriesPosition: UnitDeliveriesPositions|null = null;
  public unitDeliveries: Array<UnitDeliveriesPositions>;
  public suppliers : Array<Suppliers>;
  public supplierId: string;
  public supplier: Suppliers;
  flagType: boolean = false;
  suppliersPositions : Array<SuppliersPositions>;
  isNewRecord: boolean = false;
  statusMessage: string = "";
  suppliersPosition : SuppliersPositions = new SuppliersPositions("","","",0);
  routeChangeSub: Subscription;

  constructor(private serv: UnitDeliverService, private suppliersService : SuppliersService
    , private suppliersPositionsService : SuppliersPositionsService, public dialog: MatDialog,
              private _location: Location, private router: Router) {
    this.unitDeliveries = new Array<UnitDeliveriesPositions>();
    this.suppliers = new Array<Suppliers>();
    this.suppliersPositions = new Array<SuppliersPositions>();
    this.supplier = new Suppliers();
  }

  backClicked() {
    this._location.back();
  }

  fireEvent()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Позиции заявки.xlsx');

  }

  openDialog(id: string): void {
      this.suppliersPositionsService.findAllById(id).subscribe((data: Array<SuppliersPositions>) => {
        this.suppliersPositions = data;
        this.suppliersService.find(id).subscribe((data1: Suppliers) => {
          this.supplier = data1;
          const dialogRef = this.dialog.open(DialogDeliversComponent, {
            width: 'auto',
            height: 'auto',
            data: {supplier: this.supplier, suppliersPositions: this.suppliersPositions},
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result != undefined) {
              this.suppliersPositionsService.find(result as string).subscribe((data: SuppliersPositions) => {
                this.flagType = true;
                this.suppliersPosition = data;
                if (this.editedDeliveriesPosition instanceof UnitDeliveriesPositions) {
                  this.editedDeliveriesPosition.priceOne = this.suppliersPosition.priceOne;
                  this.editedDeliveriesPosition.measure = this.suppliersPosition.measure;
                }
              });
            } else {
              this.flagType = false;
            }
          });
        });
      });
  }
  ngOnInit() {
    this.loadDeliveriesPositions();
  }

  private loadDeliveriesPositions() {
    this.suppliersService.findAll().subscribe((data: Array<Suppliers>) => {
      this.suppliers = data;
     this.serv.findAll().subscribe((data: Array<UnitDeliveriesPositions>) => {
      this.unitDeliveries = data;
       },
       (error) => {
         this.router.navigate(['home/units']);
         console.log("error")
      });
      },
      (error) => {
        this.router.navigate(['home/units']);
        console.log("error")
    });
  }

  public addDeliveriesPosition() {
    this.editedDeliveriesPosition = new UnitDeliveriesPositions("","","",0,0,0, true);
    this.unitDeliveries.push(this.editedDeliveriesPosition);
    this.isNewRecord = true;
  }


  public editDeliveriesPositions(unitDeliveries: UnitDeliveriesPositions) {
    this.editedDeliveriesPosition = new UnitDeliveriesPositions(unitDeliveries.id, unitDeliveries.namePosition, unitDeliveries.measure, unitDeliveries.quantity,
      unitDeliveries.priceOne, unitDeliveries.price, unitDeliveries.status);
  }

  public loadTemplate(unitDeliveries: UnitDeliveriesPositions) {
      if (this.editedDeliveriesPosition && this.editedDeliveriesPosition.id === unitDeliveries.id) {
        return this.editTemplate;
      } else {
        return this.readOnlyTemplate;
      }
  }

  public saveDeliveriesPositions() {
    this.suppliersService.find(this.supplierId).subscribe( (data:Suppliers) => {
      this.serv.setSuppliers(data);
      this.flagType = false;
      if (this.isNewRecord) {
        // добавляем пользователя
        this.serv.createDeliveriesPositions(this.editedDeliveriesPosition as UnitDeliveriesPositions).subscribe(data => {
          this.statusMessage = 'Данные успешно добавлены';
          this.loadDeliveriesPositions();
        });
        this.isNewRecord = false;
        this.editedDeliveriesPosition = null;
      } else {
        // изменяем пользователя
        this.serv.createDeliveriesPositions(this.editedDeliveriesPosition as UnitDeliveriesPositions).subscribe(data => {
          this.statusMessage = 'Данные успешно обновлены';
          this.loadDeliveriesPositions();
        });
        this.editedDeliveriesPosition = null;
      }
    });
  }
  public updateStatus(unitDeliveriesPositions : UnitDeliveriesPositions){
    if(unitDeliveriesPositions.status) {
      unitDeliveriesPositions.status = false;
      this.serv.updateStatus(unitDeliveriesPositions).subscribe(result =>
        this.loadDeliveriesPositions());
    }
    else{
      unitDeliveriesPositions.status = true;
      this.serv.updateStatus(unitDeliveriesPositions).subscribe(result =>
        this.loadDeliveriesPositions());
    }
  }
  public cancel() {
    if (this.isNewRecord) {
      this.unitDeliveries.pop();
      this.isNewRecord = false;
    }
    this.editedDeliveriesPosition = null;
  }

  public deleteDeliveriesPositions(unitDeliveries: UnitDeliveriesPositions) {
    this.serv.deleteDeliveriesPositions(unitDeliveries.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadDeliveriesPositions();
    });
  }

}
