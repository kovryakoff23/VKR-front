import { Component, OnInit } from '@angular/core';
import {Information} from "./information";
import {Observable} from "rxjs";
import {InformationService} from "./information.service";
import {InfoReport} from "./info-report";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  information: Information;
  fileInfos?: Observable<any>;
  infoReport : InfoReport;
  constructor(private informationService: InformationService) { }

  ngOnInit(): void {
    this.createInformation();
    this.informationService.loadReports().subscribe(data=>{
      this.infoReport = data;
      this.fileInfos = this.informationService.getFiles();
    })

  }
  createInformation(){
    this.information=new Information("Организация", "ООО полное название",
      "392039", "Воронежская область", "Воронеж", "ул. Ленина", "1",
      "20202020202020", "292929929292", "3939399393", new Date(), "8-200-200-20-29");
  }
}
