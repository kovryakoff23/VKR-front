import {Component, Input, OnInit} from '@angular/core';
import {Unit} from "../unit/unit";
import {UnitService} from "../unit/unit-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {finalize, Observable, Subscription} from "rxjs";
import {UnitDocumentation} from "./unit-documentation";
import {UnitInfoService} from "./unit-info.service";
import {error} from "highcharts";
import {Location} from "@angular/common";

@Component({
  selector: 'app-unit-info',
  templateUrl: './unit-info.component.html',
  styleUrls: ['./unit-info.component.scss']
})
export class UnitInfoComponent implements OnInit {
  unit: Unit;
  id: number;
  unitDocumentation: UnitDocumentation = new UnitDocumentation();
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor(private unitService: UnitService, private unitInfoService: UnitInfoService,
              private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.queryParams.subscribe(
      (params) => (this.id = params['id']
      ))
    this.unitService.find().subscribe(data => {
      this.unit = data;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => (this.id = params['id']
      ))
    this.unitService.find().subscribe(
      (data) => {
        this.unit = data;
        this.fileInfos = this.unitInfoService.getFiles(this.unit);
      },
      (error) => {
      this.router.navigate(['home/units']);
        console.log("error")
      });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.unitInfoService.upload(this.currentFile, this.unit).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.unitInfoService.getFiles(this.unit);
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Не удалось загрузить файл!';
            }
            this.currentFile = undefined;
          }
        });
      }
      this.selectedFiles = undefined;
    }
  }

}
