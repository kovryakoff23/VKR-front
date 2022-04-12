import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Unit} from "../unit/unit";
import {UnitService} from "../unit/unit-service.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent {

  unit: Unit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService, private _location: Location) {
    this.unit = new Unit();
  }

  backClicked() {
    this._location.back();
  }

  onSubmit() {
    this.unitService.save(this.unit).subscribe(result => this.gotoUnitList());
  }

  gotoUnitList() {
    this.router.navigate(['/home/units']);
  }
}
