import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UnitDeliveries} from "./unit-deliveries";
import {UnitDeliveriesService} from "./unit-deliveries.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-unit-deliveries.ts',
  templateUrl: './unit-deliveries.component.html',
  styleUrls:  ['./unit-deliveries.component.scss']
})
export class UnitDeliveriesComponent implements OnInit {

  unitDeliveries: Array<UnitDeliveries>;
  isNewRecord: boolean = false
  value : string;

  constructor(private serv: UnitDeliveriesService, private route: ActivatedRoute, private router: Router) {
    this.loadDelivers();
    this.unitDeliveries = new Array<UnitDeliveries>();
  }

  ngOnInit() {
    this.loadDelivers();
  }

  //загрузка пользователей
  private loadDelivers() {
    this.serv.findAll().subscribe((data: Array<UnitDeliveries>) => {
      this.unitDeliveries = data;
      },
      (error) => {
        this.router.navigate(['home/units']);
        console.log("error")
    });
  }
  public addDeliver(){
    this.router.navigate(['/home/units/unit-navigate/unit-deliver-add']);
  }
  public openDetails(unitDeliver : UnitDeliveries){
    this.serv.setId(unitDeliver.id);
    this.serv.setDeliver(unitDeliver);
    console.log("openDetails = "+this.serv.getId());
    this.router.navigate(['/home/units/unit-navigate/unit-deliver']);
  }
  public updateStatus(unitDeliver : UnitDeliveries){
    if(unitDeliver.status) {
      unitDeliver.status = false;
      this.serv.update(unitDeliver).subscribe(result =>
        this.unitDeliveries);
    }
    else{
      unitDeliver.status = true;
      this.serv.update(unitDeliver).subscribe(result =>
        this.unitDeliveries);
    }
  }
}
