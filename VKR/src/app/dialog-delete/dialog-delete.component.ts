import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../dialog-worker/dialog-worker.component";

export class DialogDeleteData{
  message: string;
}

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent {
  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data : DialogDeleteData) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
