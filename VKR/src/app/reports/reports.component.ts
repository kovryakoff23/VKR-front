import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {Reports} from "./reports";
import {UnitService} from "../unit/unit-service.service";
import {ReportsService} from "./reports.service";
import {Unit} from "../unit/unit";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{
   reports: Reports;
   unit : Unit;
   percent: string = "33";
    saleData = [];
    constructor(private unitService: UnitService, private reportsService:ReportsService, private router: Router) {
    }
    ngOnInit() {
      this.unitService.find().subscribe((data)=>{
        this.unit=data;
      this.reportsService.find(this.unit).subscribe(data1=>{
        this.reports = data1;
        this.saleData = [
          { name: "Заработнаяя плата", value: this.reports.sumSalaries },
          { name: "Оплата поставок", value: this.reports.sumSupply },
          { name: "Содержание оъекта", value: this.reports.sumUpkeep },
          { name: "Стоимость аренды оборудования", value: this.reports.sumEquipmentRental },
        ];
        // setAttribute('data-percentage', this.percent)
        // console.log(document.querySelector('.progress').getAttribute('data-percentage'));
      });
        },
        (error) => {
          this.router.navigate(['home/units']);
          console.log("error")
      });
    }
}
