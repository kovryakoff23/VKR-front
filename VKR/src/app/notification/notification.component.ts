import { Component, OnInit } from '@angular/core';
import {MyWorker} from "../worker/worker";
import {Salary} from "../worker/salary";
import {WorkerService} from "../worker/worker.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteComponent} from "../dialog-delete/dialog-delete.component";
import {Notification} from "./notification";
import {NotificationService} from "./notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications: Array<Notification>;
  isAdd: boolean = false;
  message : string;
  constructor(private serv:NotificationService, private route: ActivatedRoute, private router: Router) {
    this.notifications = new Array<Notification>();
    this.loadWorker();
  }

  backClicked(){
    this.isAdd=false;
  }

  ngOnInit() {
    this.loadWorker();
  }
  //загрузка пользователей
  private loadWorker() {
    this.serv.findAll().subscribe((data: Array<Notification>) => {
      this.notifications = data;
    });
  }
  public addWorker(){
    this.isAdd = true;
  }

}
