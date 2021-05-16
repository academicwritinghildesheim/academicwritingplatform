import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
 
}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {
  constructor(public dialog: MatDialog) {}
  
 closeDialog(){
    this.dialog.closeAll()
  }

}
