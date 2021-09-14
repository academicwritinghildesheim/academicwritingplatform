import { Component, Inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';




interface Schreibunterstuetzung {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})





@Injectable()
export class ApiComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RegistrierungsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private readonly http: HttpClient) {}
    //private http: HttpClient) { }
    //private base_url='https://academicwritinghildesheim.herokuapp.com/api/synonyms?word=zeigen'



    getSemanticRelations(): void {
      let ausgabe = this.http.get(this.base_url)
      console.log(ausgabe)
    }
    /*
        getSemanticRelations(): Observable<Schreibunterstuetzung[]> {
      return this.http.get<Schreibunterstuetzung[]>(this.base_url)
    }
    */

  const req = new HttpRequest('GET', 'https://academicwritinghildesheim.herokuapp.com/api/synonyms?word=zeigen', {
    reportProgress: true
  });

  semantische_relationen=''

  ngOnInit(): void {
  }
  schreibunterstuetzung: Schreibunterstuetzung[] = [
    {value: 'synonym-0', viewValue: 'Synonyme'},
    {value: 'antonym-1', viewValue: 'Antonyme'},
    {value: 'hyperonym-2', viewValue: 'Hyperonyme'},
    {value: 'hyponym-3', viewValue: 'Hyponyme'},
    {value: 'meronym-4', viewValue: 'Meronyme'},
    {value: 'holonym-5', viewValue: 'Holonyme'},
  ];

}
