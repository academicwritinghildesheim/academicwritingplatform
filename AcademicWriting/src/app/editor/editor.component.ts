import {MatDialog} from '@angular/material/dialog';
import {AfterViewChecked, Component} from '@angular/core';
import {DialogComponent} from './components/dialog/dialog.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewChecked {
  constructor(public dialog: MatDialog) {
  }

  markdown = `# Markdown Cheat Sheet

  Thanks for visiting [The Markdown Guide](https://www.markdownguide.org)!

  This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can’t cover every edge case, so if you need more information about any of these elements, refer to the reference guides for [basic syntax](https://www.markdownguide.org/basic-syntax) and [extended syntax](https://www.markdownguide.org/extended-syntax).

  ## Basic Syntax

  These are the elements outlined in John Gruber’s original design document. All Markdown applications support these elements.

  ### Heading

  # H1
  ## H2
  ### H3

  ### Bold

  **bold text**

  ### Italic

  *italicized text*

  ### Blockquote

  > blockquote

  ### Ordered List

  1. First item
  2. Second item
  3. Third item

  ### Unordered List

  - First item
  - Second item
  - Third item

  ### Code

  \`code\`

  ### Horizontal Rule

  ---

  ### Link

  [title](https://www.example.com)

  ### Image

  ![alt text](image.jpg)

  ## Extended Syntax

  These elements extend the basic syntax by adding additional features. Not all Markdown applications support these elements.

  ### Table

  | Syntax | Description |
  | ----------- | ----------- |
  | Header | Title |
  | Paragraph | Text |

  ### Fenced Code Block

  \`\`\`
  {
    "firstName": "John",
    "lastName": "Smith",
    "age": 25
  }
  \`\`\`

  ### Footnote

  Here's a sentence with a footnote. [^1]

  [^1]: This is the footnote.

  ### Heading ID

  ### My Great Heading {#custom-id}

  ### Definition List

  term
  : definition

  ### Strikethrough

  ~~The world is flat.~~

  ### Task List

  - [x] Write the press release
  - [ ] Update the website
  - [ ] Contact the media
  `;

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
    this.dialog.open(DialogComponent);
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



