import { Component, OnInit } from '@angular/core';
import {Unit} from "../unit/unit";
import {UnitService} from "../unit/unit-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  units: Unit[];
  id: number;
  search : string;
  hidden:boolean = false;
  constructor(private unitService: UnitService, private route: ActivatedRoute, private router: Router) {
    this.units=[];
    this.hidden = false;
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
    this.hidden=true;
    this.router.navigate(['/home/archive/archive-navigate']);
  }
  ngOnInit() {
    this.hidden = false;
    this.unitService.findAll().subscribe(data => {
      this.units = data;
    });
    console.log(this.units.toLocaleString())
    this.route.queryParams.subscribe(
      (params) => (this.id = params['id']
      ))
  }
}
