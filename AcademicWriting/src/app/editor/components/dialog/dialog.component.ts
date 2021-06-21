import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  stunden=0;
  minuten=0;
  isChecked = false;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  public startTimer(): void{
    this.isChecked=true;
  };
  
  public closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  ngOnDestroy() {
     
       console.log("hello from destroydialog")
  }

}
