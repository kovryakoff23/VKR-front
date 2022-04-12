import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UnitUpkeep} from "./unit-upkeep";
import {UnitUpkeepService} from "./unit-upkeep.service";
import * as XLSX from 'xlsx';
import {Router} from "@angular/router";
@Component({
  selector: 'app-unit-upkeep',
  templateUrl: './unit-upkeep.component.html',
  styleUrls: ['./unit-upkeep.component.scss']
})
export class UnitUpkeepComponent implements OnInit {

//типы шаблонов
  @ViewChild('readOnlyTemplate', {static: false})
  readOnlyTemplate!: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false})
  editTemplate!: TemplateRef<any>|undefined;
  @ViewChild("table") table: ElementRef;

  public editedUnitUpkeep: UnitUpkeep|null = null;
  public unitUpkeeps: Array<UnitUpkeep>;
  isNewRecord: boolean = false;
  statusMessage: string = "";

  constructor(private serv: UnitUpkeepService, private router: Router) {
    this.unitUpkeeps = new Array<UnitUpkeep>();
  }

  ngOnInit() {
    this.loadUpkeep();
  }

  fireEvent()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Содержание.xlsx');

  }

  //загрузка пользователей
  private loadUpkeep() {
    this.serv.findAll().subscribe((data: Array<UnitUpkeep>) => {
      this.unitUpkeeps = data;
      },
      (error) => {
        this.router.navigate(['home/units']);
        console.log("error")
    });
  }
  // добавление пользователя
  public addUpkeep() {
    this.editedUnitUpkeep = new UnitUpkeep("","",0,"");
    this.unitUpkeeps.push(this.editedUnitUpkeep);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  public editUpkeep(unitUpkeep:UnitUpkeep) {
    this.editedUnitUpkeep = new UnitUpkeep(unitUpkeep.id, unitUpkeep.name, unitUpkeep.price, unitUpkeep.note);
  }

  // загружаем один из двух шаблонов
  public loadTemplate(upkeep: UnitUpkeep) {
    if (this.editedUnitUpkeep && this.editedUnitUpkeep.id === upkeep.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  public saveUpkeep() {
      if (this.isNewRecord) {
        // добавляем пользователя
        this.serv.createUser(this.editedUnitUpkeep as UnitUpkeep).subscribe(data => {
          this.statusMessage = 'Данные успешно добавлены',
            this.loadUpkeep();
        });
        this.isNewRecord = false;
        this.editedUnitUpkeep = null;
      } else {
        // изменяем пользователя
        this.serv.createUser(this.editedUnitUpkeep as UnitUpkeep).subscribe(data => {
          this.statusMessage = 'Данные успешно обновлены',
            this.loadUpkeep();
        });
        this.editedUnitUpkeep = null;
      }
  }
  // отмена редактирования
  public cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.unitUpkeeps.pop();
      this.isNewRecord = false;
    }
    this.editedUnitUpkeep = null;
  }
  // удаление пользователя
  public deleteUpkeep(unitUpkeep: UnitUpkeep) {
    console.log(unitUpkeep.id);
    this.serv.deleteUser(unitUpkeep.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadUpkeep();
    });
  }
}
