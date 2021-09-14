import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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



  getSemanticRelationsold(): void {
    //let ausgabe = this.http.get(this.base_url)
    console.log("test")
  }


  public getSemanticRelations(): void {
    console.log(this.suchWort)
    console.log(this.selectedSemanticRelation)
    this.openDialog()
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
  public openDialog2(): void {
    this.dialog.open;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ApiComponent, {
      width: '250px',
      data: { name: "test", animal: "test2" }
    });
  }

  /*
      getSemanticRelations(): Observable<Schreibunterstuetzung[]> {
    return this.http.get<Schreibunterstuetzung[]>(this.base_url)
  }
  */

  //const req = new HttpRequest('GET', 'https://academicwritinghildesheim.herokuapp.com/api/synonyms?word=zeigen', {
  //reportProgress: true


  suchWort = "test";

  ngOnInit(): void {
  }
  schreibunterstuetzungen: Schreibunterstuetzung[] = [
    { value: 'synonyms', viewValue: 'Synonyme' },
    { value: 'antonyms', viewValue: 'Antonyme' },
    { value: 'hypernyms', viewValue: 'Hyperonyme' },
    { value: 'hyponyms', viewValue: 'Hyponyme' },
    { value: 'meronyms', viewValue: 'Meronyme' },
    { value: 'holonyms', viewValue: 'Holonyme' },
  ];

}
