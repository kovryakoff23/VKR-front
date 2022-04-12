import {Component, Inject, OnInit} from '@angular/core';
import {WorkerDetails} from "../worker-details/worker-details";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WorkerDetailsService} from "../worker-details/worker-details.service";
import {DialogData} from "../dialog-worker/dialog-worker.component";
import {MyWorker} from "../worker/worker";
import {SuppliersPositionsService} from "../suppliers-positions/suppliers-positions.service";
import {Suppliers} from "../suppliers/suppliers";
import {SuppliersPositions} from "../suppliers-positions/suppliers-positions";

export class DialogDataDeliver {
  supplier: Suppliers;
  suppliersPositions : Array<SuppliersPositions>;
  supplierId: string;
}
@Component({
  selector: 'app-dialog-delivers',
  templateUrl: './dialog-delivers.component.html',
  styleUrls: ['./dialog-delivers.component.scss']
})
export class DialogDeliversComponent {

  supplierPositions: SuppliersPositions = new SuppliersPositions("","","",0);
  constructor(public dialogRef: MatDialogRef<DialogDeliversComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataDeliver,private serv :SuppliersPositionsService) {
  }
  onChange(id: string){
    if(id != undefined){
      this.serv.find(id).subscribe((data)=>{
        this.supplierPositions=data;
      });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
