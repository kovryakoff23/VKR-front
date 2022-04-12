import { Component, OnInit } from '@angular/core';
import {UnitDeliveries} from "../unit-deliveries/unit-deliveries";
import {UnitDeliveriesService} from "../unit-deliveries/unit-deliveries.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UnitProduction} from "./unit-production";
import {UnitProductionsService} from "./unit-productions.service";

@Component({
  selector: 'app-unit-productions',
  templateUrl: './unit-productions.component.html',
  styleUrls: ['./unit-productions.component.scss']
})
export class UnitProductionsComponent implements OnInit {
  unitProductions: Array<UnitProduction>;

  constructor(private serv: UnitProductionsService, private route: ActivatedRoute, private router: Router) {
    this.unitProductions = new Array<UnitProduction>();
    this.loadProductions();
  }

  ngOnInit() {
    this.loadProductions();
  }

  //загрузка пользователей
  private loadProductions() {
    this.serv.findAll().subscribe((data: Array<UnitProduction>) => {
      this.unitProductions = data;
      },
      (error) => {
        this.router.navigate(['home/units']);
        console.log("error")
    });
  }
  public addProduction(){
    this.router.navigate(['/home/units/unit-navigate/production-form']);
  }
  public openDetails(unitProduction : UnitProduction){
    this.serv.setId(unitProduction.id);
    this.serv.setProduction(unitProduction);
    console.log(this.serv.getId());
    this.router.navigate(['/home/units/unit-navigate/unit-production-position']);
  }
  public updateStatus(unitProduction : UnitProduction){
    if(unitProduction.status) {
      unitProduction.status = false;
      this.serv.update(unitProduction).subscribe(result =>
        this.unitProductions);
    }
    else{
      unitProduction.status = true;
      this.serv.update(unitProduction).subscribe(result =>
        this.unitProductions);
    }
  }

}
