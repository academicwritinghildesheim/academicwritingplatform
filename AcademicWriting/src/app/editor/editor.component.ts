import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Component} from '@angular/core';

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

  public openDialog(): void {
    this.dialog.open(DialogElementsExampleDialogComponent);
  }
}

@Component({
  selector: 'app-dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialogComponent>) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
