import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UnitUpkeep} from "../unit-upkeep/unit-upkeep";
import {UnitUpkeepService} from "../unit-upkeep/unit-upkeep.service";
import {UnitProductionPosition} from "../unit-production-position/unit-production-position";
import {UnitEquipmentRental} from "./unit-equipment-rental";
import {UnitEquipmentRentalService} from "./unit-equipment-rental.service";
import * as XLSX from "xlsx";
import {Router} from "@angular/router";

@Component({
  selector: 'app-unit-equipment-rental',
  templateUrl: './unit-equipment-rental.component.html',
  styleUrls: ['./unit-equipment-rental.component.scss']
})
export class UnitEquipmentRentalComponent implements OnInit {

//типы шаблонов
  @ViewChild('readOnlyTemplate', {static: false})
  readOnlyTemplate!: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false})
  editTemplate!: TemplateRef<any>|undefined;
  @ViewChild("table") table: ElementRef;

  public editedEquipmentRental: UnitEquipmentRental|null = null;
  public unitEquipmentRentals: Array<UnitEquipmentRental>;
  isNewRecord: boolean = false;
  statusMessage: string = "";

  constructor(private serv: UnitEquipmentRentalService, private router: Router) {
    this.unitEquipmentRentals = new Array<UnitEquipmentRental>();
  }
  fireEvent()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Затраты на оборудование.xlsx');

  }
  ngOnInit() {
    this.loadEquipmentRental();
  }

  //загрузка пользователей
  private loadEquipmentRental() {
    this.serv.findAll().subscribe((data: Array<UnitEquipmentRental>) => {
      this.unitEquipmentRentals = data;
      },
      (error) => {
        this.router.navigate(['home/units']);
        console.log("error")
    });
  }
  // добавление пользователя
  public addEquipmentRental() {
    this.editedEquipmentRental = new UnitEquipmentRental("","",new Date(), 0,"");
    this.unitEquipmentRentals.push(this.editedEquipmentRental);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  public editEquipmentRental(unitEquipmentRental:UnitEquipmentRental) {
    this.editedEquipmentRental = new UnitEquipmentRental(unitEquipmentRental.id, unitEquipmentRental.nameEquipment,
     unitEquipmentRental.dateUse, unitEquipmentRental.price, unitEquipmentRental.note);
  }

  // загружаем один из двух шаблонов
  public loadTemplate(unitEquipmentRental: UnitEquipmentRental) {
    if (this.editedEquipmentRental && this.editedEquipmentRental.id === unitEquipmentRental.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  public saveEquipmentRental() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.serv.createUser(this.editedEquipmentRental as UnitEquipmentRental).subscribe(data => {
        this.statusMessage = 'Данные успешно добавлены',
          this.loadEquipmentRental();
      });
      this.isNewRecord = false;
      this.editedEquipmentRental = null;
    } else {
      // изменяем пользователя
      this.serv.createUser(this.editedEquipmentRental as UnitEquipmentRental).subscribe(data => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadEquipmentRental();
      });
      this.editedEquipmentRental = null;
    }
  }
  // отмена редактирования
  public cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.unitEquipmentRentals.pop();
      this.isNewRecord = false;
    }
    this.editedEquipmentRental = null;
  }
  // удаление пользователя
  public deleteEquipmentRental(unitEquipmentRental: UnitEquipmentRental) {
    console.log(unitEquipmentRental.id);
    this.serv.deleteUser(unitEquipmentRental.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadEquipmentRental();
    });
  }

}
