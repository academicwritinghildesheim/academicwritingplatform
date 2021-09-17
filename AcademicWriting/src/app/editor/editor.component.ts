import {MatDialog} from '@angular/material/dialog';
import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {DialogComponent} from './components/dialog/dialog.component';
import {ApiComponent} from './components/api/api.component';
import {MarkdownService} from 'ngx-markdown';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewChecked {
  public musikToggleActivelofi = false;
  public musikToggleActiveclassic = false;
  public musikToggleActiverain = false;

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
  public wordcountlaenge = 0;
  public wordList: string[];
  public papers: any[];

  public markdown = `# Markdown Cheat Sheet

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

  constructor(public dialog: MatDialog,
              private markdownService: MarkdownService,
              private readonly http: HttpClient,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.getAllPapers();
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

  public wordCounter(pageIndex: number): void {
    let wordcountlaenge = 0;
    for (let i = 0; i < pageIndex + 1; i++) {
      const html = this.markdownService.compile(this.pages[i].innerText);
      const text = html.replace(/<[^>]*>/g, '').toString() //
        .replace(/&#160;/g, ' ') // leerzeichen soll als ' ' angezeigt werden
        .replace(/&#10;/g, ' '); // Zeilenumbruch soll als ' ' angezeigt werden
      this.wordList = text ? text.split(/\s+/) : []; // Wörterliste
      wordcountlaenge += this.wordList.length - 1; // Anzahl der Wörter

    }
    this.wordcountlaenge = wordcountlaenge;
  }

  public openDialog(): void {
    this.dialog.open(DialogComponent);
  }

  public sentenceLength(): void {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.get(`https://academicwritinghildesheim.herokuapp.com/api/statistics/avg_sentence_length?text=This is a sentence. This is one too! How about this one?`, httpOptions)
      .subscribe(wordList => {
        console.log(wordList);

      });
  }

  public getAllPapers(): void {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('access_token')}`
      })
    };
    this.http.get(`https://academicwritinghildesheim.herokuapp.com/api/paper?all=True`, httpOptions)
      .subscribe((wordList: any) => {
        console.log(wordList);
        this.papers = wordList;

      });
  }

  public addPaper(): void {
    let text = '';
    for (const page of this.pages) {
      text += page.innerText;
    }
    console.log(text);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('access_token')}`
      })
    };
    this.http.post(`https://academicwritinghildesheim.herokuapp.com/api/paper`, {
      content: text,
      title: 'Dokument',
      last_modified: new Date(),
      author_id: localStorage.getItem('user_id')
    }, httpOptions)
      .subscribe(wordList => {
        console.log(wordList);

      });
  }

  public changePaper(): void {
    // TODO: choose one paper which is to be displayed
    // what happens to current paper? auto-save? no save?
    // update function (put request) = save?
  }

  public updatePaper(): void {
    const paper_id = 1;

    let text = '';
    for (const page of this.pages) {
      text += page.innerText;
    }
    console.log(text);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('access_token')}`
      })
    };

    this.http.put(`https://academicwritinghildesheim.herokuapp.com/api/paper?id=2`, {
      content: text,
      title: '2',
      last_modified: new Date(),
      author_id: localStorage.getItem('user_id')
    }, httpOptions)
      .subscribe(wordList => {
        console.log(wordList);

      });
  }

  public deletePaper(): void {
    const paper_id = 1;

    let text = '';
    for (const page of this.pages) {
      text += page.innerText;
    }
    console.log(text);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('access_token')}`
      })
    };
    this.http.delete(`https://academicwritinghildesheim.herokuapp.com/api/paper?id=2`, httpOptions)
      .subscribe(wordList => {
        console.log(wordList);

      });
  }

  public convertPaper(): void {
    let markdown = '';
    for (const page of this.pages) {
      markdown = this.markdownService.compile(page.htmlContent);
      // const text = markdown.replace(/<[^>]*>/g, '').toString()
    }
    console.log(markdown);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `${localStorage.getItem("access_token")}`
        Accept: '*/*',
      })
    };

    this.http.post(`https://md-to-pdf.herokuapp.com/`, {
      markdown: '<p>markdown</p>',
    }, httpOptions)
      .subscribe(wordList => {
        console.log(wordList);

      });
  }

  public openApiDialog(): void {
    const dialogRef = this.dialog.open(ApiComponent, {
      width: '250px',
      height: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
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

  public logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('').then(r => r);
  }

  public slideTogglelofi(): void {
    if (this.musikToggleActivelofi === true) {
      this.musikToggleActivelofi = false;

    } else {
      this.musikToggleActivelofi = true;
    }
  }

  public slideToggleclassic(): void {
    if (this.musikToggleActiveclassic === true) {
      this.musikToggleActiveclassic = false;
    } else {
      this.musikToggleActiveclassic = true;

    }
  }

  public slideTogglerain(): void {
    if (this.musikToggleActiverain === true) {
      this.musikToggleActiverain = false;
    } else {
      this.musikToggleActiverain = true;
    }
  }
}



