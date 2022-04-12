import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MyWorker} from "../worker/worker";
import {WorkerDetails} from "../worker-details/worker-details";
import {WorkerDetailsService} from "../worker-details/worker-details.service";

export class DialogData {
  worker: MyWorker;
  workerDetails : Array<WorkerDetails>;
  workerDetailId: string;
}
@Component({
  selector: 'app-dialog-worker',
  templateUrl: './dialog-worker.component.html',
  styleUrls: ['./dialog-worker.component.scss']
})
export class DialogWorkerComponent {
  workerDetail: WorkerDetails = new WorkerDetails("","","",0,"");
  constructor(public dialogRef: MatDialogRef<DialogWorkerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,private serv :WorkerDetailsService) {
  }
  onChange(id: string){
    if(id != undefined){
    this.serv.find(id).subscribe((data)=>{
      this.workerDetail=data;
    });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
