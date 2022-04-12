import { Component, OnInit } from '@angular/core';
import {Unit} from "../unit/unit";
import {ActivatedRoute, Router} from "@angular/router";
import {UnitService} from "../unit/unit-service.service";
import {UnitDeliveries} from "../unit-deliveries/unit-deliveries";
import {UnitDeliverService} from "../unit-deliver/unit-deliver.service";
import {UnitDeliveriesService} from "../unit-deliveries/unit-deliveries.service";
import {Location} from '@angular/common'

@Component({
  selector: 'app-unit-deliver-add',
  templateUrl: './unit-deliver-add.component.html',
  styleUrls: ['./unit-deliver-add.component.scss']
})
export class UnitDeliverAddComponent{

  unitDeliver: UnitDeliveries;
  dateCurrent: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitDeliverService: UnitDeliveriesService, private _location: Location) {
    this.unitDeliver = new UnitDeliveries();
    this.dateCurrent = new Date();
  }
  backClicked() {
    this._location.back();
  }
  onSubmit() {
    console.log(this.dateCurrent);
    this.unitDeliverService.save(this.unitDeliver).subscribe(result =>
      this.router.navigate(['/home/units/unit-navigate/unit-deliveries']));
  }

  gotoUnitList() {
    this.router.navigate(['/home/units/unit-navigate/unit-deliveries']);
  }
}
