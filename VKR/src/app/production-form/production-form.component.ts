import { Component, OnInit } from '@angular/core';
import {UnitDeliveries} from "../unit-deliveries/unit-deliveries";
import {ActivatedRoute, Router} from "@angular/router";
import {UnitDeliveriesService} from "../unit-deliveries/unit-deliveries.service";
import {UnitProduction} from "../unit-productions/unit-production";
import {UnitProductionsService} from "../unit-productions/unit-productions.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.scss']
})
export class ProductionFormComponent {

  unitProduction: UnitProduction;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitProductionsService: UnitProductionsService, private _location: Location) {
    this.unitProduction = new UnitProduction();
  }
  backClicked() {
    this._location.back();
  }
  onSubmit() {

    this.unitProductionsService.save(this.unitProduction).subscribe(result =>
      this.router.navigate(['/home/units/unit-navigate/unit-productions']));
  }

  gotoUnitList() {
    this.router.navigate(['/home/units/unit-navigate/unit-productions']);
  }

}
