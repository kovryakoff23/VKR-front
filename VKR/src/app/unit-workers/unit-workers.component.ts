import { Component, OnInit } from '@angular/core';
import {MyWorker} from "../worker/worker";
import {WorkerService} from "../worker/worker.service";
import {UnitProductionPositionService} from "../unit-production-position/unit-production-position.service";
import {UnitService} from "../unit/unit-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-unit-workers',
  templateUrl: './unit-workers.component.html',
  styleUrls: ['./unit-workers.component.scss']
})
export class UnitWorkersComponent implements OnInit {
  workers :Array<MyWorker>;
  constructor(private unitService: UnitService, private router: Router, private unitProductionPositionService: UnitProductionPositionService) {
    this.workers = Array<MyWorker>();
  }

  ngOnInit(): void {
    this.unitProductionPositionService.findByUnitId(this.unitService.getId()).subscribe(data=>{
      this.workers=data;
      },
      (error) => {
        this.router.navigate(['home/units']);
        console.log("error")
    })
  }
}
