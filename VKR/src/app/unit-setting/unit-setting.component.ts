import { Component, OnInit } from '@angular/core';
import {Unit} from "../unit/unit";
import {UnitService} from "../unit/unit-service.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-unit-setting',
  templateUrl: './unit-setting.component.html',
  styleUrls: ['./unit-setting.component.scss']
})
export class UnitSettingComponent implements OnInit {
  unit: Unit;
  constructor(private unitService: UnitService, private _location: Location,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadUnit();
  }
  public loadUnit(){
    this.unitService.find().subscribe((data:Unit)=>{
      this.unit = data;
      },
      (error) => {
        this.router.navigate(['home/units']);
        console.log("error")
    });
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
  public updateStatus(){
    this.unit.type=!this.unit.type;
    this.unitService.save(this.unit).subscribe(data=>{
      this.gotoUnitList();
    })
  }
  public deleteUnit(){
    this.unitService.delete(this.unit.id).subscribe(data=>{
      this.gotoUnitList();
    })
  }
}
