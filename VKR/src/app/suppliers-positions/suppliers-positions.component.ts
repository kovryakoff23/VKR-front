import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SuppliersPositions} from "./suppliers-positions";
import {SuppliersPositionsService} from "./suppliers-positions.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-suppliers-positions',
  templateUrl: './suppliers-positions.component.html',
  styleUrls: ['./suppliers-positions.component.scss']
})
export class SuppliersPositionsComponent implements OnInit {
//типы шаблонов
  @ViewChild('readOnlyTemplate', {static: false})
  readOnlyTemplate!: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false})
  editTemplate!: TemplateRef<any>|undefined;

  public editedSuppliersPositions: SuppliersPositions|null = null;
  public suppliersPositions: Array<SuppliersPositions>;
  isNewRecord: boolean = false;
  statusMessage: string = "";

  constructor(private serv: SuppliersPositionsService, private _location: Location) {
    this.suppliersPositions = new Array<SuppliersPositions>();
  }

  backClicked() {
    this._location.back();
  }

  ngOnInit() {
    this.loadSuppliersPositions();
  }

  //загрузка пользователей
  private loadSuppliersPositions() {
    this.serv.findAll().subscribe((data: Array<SuppliersPositions>) => {
      this.suppliersPositions = data;
    });
  }
  // добавление пользователя
  public addSuppliersPositions() {
    this.editedSuppliersPositions = new SuppliersPositions("","","",0);
    this.suppliersPositions.push(this.editedSuppliersPositions);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  public editSuppliersPositions(supplierPosition: SuppliersPositions) {
    this.editedSuppliersPositions = new SuppliersPositions(supplierPosition.id, supplierPosition.namePosition,
      supplierPosition.measure, supplierPosition.priceOne);
  }

  // загружаем один из двух шаблонов
  public loadTemplate(supplierPosition: SuppliersPositions) {
    if (this.editedSuppliersPositions && this.editedSuppliersPositions.id === supplierPosition.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  public saveSuppliersPositions() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.serv.createSuppliersPositions(this.editedSuppliersPositions as SuppliersPositions).subscribe(data => {
        this.statusMessage = 'Данные успешно добавлены',
          this.loadSuppliersPositions();
      });
      this.isNewRecord = false;
      this.editedSuppliersPositions = null;
    } else {
      // изменяем пользователя
      this.serv.createSuppliersPositions(this.editedSuppliersPositions as SuppliersPositions).subscribe(data => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadSuppliersPositions();
      });
      this.editedSuppliersPositions = null;
    }
  }
  // отмена редактирования
  public cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.suppliersPositions.pop();
      this.isNewRecord = false;
    }
    this.editedSuppliersPositions = null;
  }
  // удаление пользователя
  public deleteUser(supplierPosition: SuppliersPositions) {
    console.log(supplierPosition.id);
    this.serv.deleteUser(supplierPosition.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadSuppliersPositions();
    });
  }
}
