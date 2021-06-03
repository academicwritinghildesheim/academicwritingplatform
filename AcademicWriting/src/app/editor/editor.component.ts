import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AfterViewChecked, Component} from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewChecked {
  constructor(public dialog: MatDialog) {}

  public sizePage = {
    width: 13,
    height: 18
  };

  public paddingPage = {
    top: 2,
    right: 2,
    bottom: 2,
    left: 2
  };

  public pages = [
    {
      htmlContent: null,
      full: false,
      innerText: null
    },
  ];

  public currentPage = 0;
  public currentChar = null;
  public element: HTMLElement;
  public runAfterViewChecked = false;

  public openDialog(): void {
    this.dialog.open(DialogElementsExampleDialogComponent);
  }

  public clickPage(i): void {
    this.currentPage = i;
  }

  public inputContent(char, i): void {
    this.element = document.getElementById('editor-' + i);
    const heightContent = this.element.offsetHeight * 2.54 / 96;
    this.pages[i].htmlContent = this.element.innerHTML;
    this.pages[i].innerText = this.element.innerText.toString();

    if (Number(heightContent.toFixed(1)) > this.sizePage.height) {
      this.currentChar = char;
      this.pages[i].full = true;
      if (!this.pages[i + 1]) {
        this.pages.push({
          htmlContent: null,
          full: false,
          innerText: null
        });
      }
      this.currentPage = i + 1;
      this.runAfterViewChecked = true;
    }
  }

  public ngAfterViewChecked(): void {
    document.getElementById('editor-' + this.currentPage).focus();
    if (this.runAfterViewChecked) {
      if (this.currentChar) {
        let str = this.pages[this.currentPage - 1].htmlContent;
        const indexLastCloseDiv = str.lastIndexOf('</div>');
        const indexLastBr = str.lastIndexOf('<br>');
        let lastChar = str[indexLastCloseDiv - 1];
        if (indexLastBr !== -1 && (indexLastBr + 4) === indexLastCloseDiv) {
          lastChar = ' ';
        }

        if (indexLastCloseDiv !== -1) {
          str = str.slice(0, indexLastCloseDiv - 1) + str.slice(indexLastCloseDiv);
        } else {
          str = str.slice(0, str.length - 1);
        }
        this.pages[this.currentPage - 1].htmlContent = str;

        if (this.pages[this.currentPage].htmlContent) {
          this.pages[this.currentPage].htmlContent = lastChar + this.pages[this.currentPage].htmlContent;
        } else {
          this.pages[this.currentPage].htmlContent = lastChar;
        }
      }

      for (let i = 0; i < this.pages.length; i++) {
        this.element = document.getElementById('editor-' + i);
        this.element.innerHTML = this.pages[i].htmlContent;
      }
      this.runAfterViewChecked = false;
    }
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
