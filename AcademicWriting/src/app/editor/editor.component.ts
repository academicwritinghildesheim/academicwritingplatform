import {MatDialog} from '@angular/material/dialog';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  constructor(public dialog: MatDialog) {}
  markdown = `## Markdown __rulez__!

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet

### Blockquote
> Blockquote to the max`;

  constructor() {
  }

  ngOnInit(): void {
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
   //schließt alle dialogs. mit dialogRef lösen?
    this.dialog.closeAll()
  }

}
