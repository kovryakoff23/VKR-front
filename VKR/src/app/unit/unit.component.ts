import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Unit} from "./unit";
import {UnitService} from "./unit-service.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UnitInfoComponent} from "../unit-info/unit-info.component";
import {FormControl} from "@angular/forms";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  units: Unit[];
  id: number;
  search : string;

  constructor(private unitService: UnitService, private route: ActivatedRoute) {
    this.units=[];
    this.unitService.findAll().subscribe(data => {
      this.units = data;
      this.unitService.setId(this.units[0].id);
    })
  }
  public getSearch(){
    console.log(this.search)
    if(this.search != undefined && this.search !='' && this.search!=null) {
      this.unitService.findAllSearch(this.search).subscribe(data => {
        this.units = data;
        console.log(data);
      });
    }
    else{
      this.unitService.findAll().subscribe(data => {
        this.units = data;
        console.log(data);
      });
    }
  }
  public updateId (id: number){
    this.id=id;
    this.unitService.setId(id);
    console.log(id);
  }
  ngOnInit() {
    this.unitService.findAll().subscribe(data => {
      this.units = data;
      this.unitService.setId(this.units[0].id);
    });
  }
}
