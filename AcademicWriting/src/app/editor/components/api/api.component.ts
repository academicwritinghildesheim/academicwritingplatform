import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  HttpClient, HttpHeaders
} from '@angular/common/http';

import { FormControl, Validators } from '@angular/forms';




interface Schreibunterstuetzung {
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})







export class ApiComponent implements OnInit {
  constructor(

    private readonly http: HttpClient,
    public dialog: MatDialog,
  ) { }
  public selectedSemanticRelation: string;
  public semanticRelationWordList: any;


  public semantische_relationen_FormControl = new FormControl('', [
    Validators.required,
  ]);

  //private http: HttpClient) { }
  //private base_url='https://academicwritinghildesheim.herokuapp.com/api/synonyms?word=zeigen'



  startApi(): void {
    //let ausgabe = this.http.get(this.base_url)
    console.log("test")
    if (1 == 1) {
      this.getDOIbyTitel()
    } else {
      this.getSemanticRelations()

    }


  }


  public getSemanticRelations(): void {
    console.log(this.suchWort)
    console.log(this.selectedSemanticRelation)
    //this.openDialog3()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.get(`https://academicwritinghildesheim.herokuapp.com/api/${this.selectedSemanticRelation}?word=${this.suchWort}`, httpOptions)
      .subscribe(wordList => {
        console.log(wordList);
        this.semanticRelationWordList = wordList

      });

  }
  public openDialog(): void {
    this.dialog.open(DialogElementsExampleDialogComponent, {
      width: '250px',
    });
  }

  public getDOIbyTitel(): void {
    let title = "Word2Vec"
    title = this.suchWort
    console.log(this.suchWort)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.get(`https://api.unpaywall.org/v2/search/?query=${title}&email=marcel.ritzmann@gmx.de`, httpOptions)
      .subscribe((response: any) => {
        console.log(response);
        console.log(response.results[0].response.doi)
        const doi = response.results[0].response.doi
        this.checkDOIstatus(doi)

      });
  }

  public checkDOIstatus(doi: string): void {

    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    //https://api.crossref.org/works/10.1037/0003-066X.59.1.29/agency
    //this.http.get(`https://api.crossref.org/works/10.1037/0003-066X.59.1.29/agency`, httpOptions)
    this.http.get(`https://api.crossref.org/works/${doi}/agency`, httpOptions)
      .subscribe((response: any) => {
        console.log(response);
        console.log(response.status);
        if (response.status == "ok") {
          this.getSimiliarLiteraturebyDOI(doi)
          console.log("jo ok")
        }
        else {
          console.log("not ok")
        }

      });
  }

  public getSimiliarLiteraturebyDOI(doi: string): void {
    const title = "Word2Vec"

    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    //https://api.crossref.org/works/10.1037/0003-066X.59.1.29/agency
    //this.http.get(`https://api.crossref.org/works/10.1037/0003-066X.59.1.29/agency`, httpOptions)
    this.http.get(`https://api.crossref.org/works/${doi}`, httpOptions)
      .subscribe((response: any) => {
        console.log(response);
        console.log(response.message.author[0]) //für alle autoren?
        let authors = []
        response.message.author.forEach(element => {
          authors.push(element.family)
        });
        this.getSimiliarLiteraturebyAuthor(authors)


      });
  }

  public getSimiliarLiteraturebyAuthor(authors: string[]): void {

    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    //https://api.crossref.org/works/10.1037/0003-066X.59.1.29/agency
    //this.http.get(`https://api.crossref.org/works/10.1037/0003-066X.59.1.29/agency`, httpOptions)
    this.http.get(`https://api.crossref.org/works?query.author=${authors[0]}`, httpOptions)
      .subscribe((response: any) => {
        console.log(response);
        let literatureRecommendations = []
        response.message.items.forEach(element => {
          //literatureRecommendations.push(element.title)
          literatureRecommendations.push(element)
        });
        console.log(literatureRecommendations)
      });
  }

  /*
      getSemanticRelations(): Observable<Schreibunterstuetzung[]> {
    return this.http.get<Schreibunterstuetzung[]>(this.base_url)
  }
  */

  //const req = new HttpRequest('GET', 'https://academicwritinghildesheim.herokuapp.com/api/synonyms?word=zeigen', {
  //reportProgress: true


  suchWort = "zeigen";

  ngOnInit(): void {
  }


  schreibunterstuetzungen: Schreibunterstuetzung[]

}


export class DialogElementsExampleDialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialogComponent>) { }



  public closeDialog(): void {
    this.dialogRef.close();
  }
}

