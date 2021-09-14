import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RegistrierungsDialogComponent } from '../registrierungs-dialog/registrierungs-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;

  public usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private readonly http: HttpClient, public dialog: MatDialog) {
  }


  public ngOnInit(): void {
  }

  public login(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post('https://academicwritinghildesheim.herokuapp.com/api/auth/login',
      { username: this.usernameFormControl.value, password: this.passwordFormControl.value }, httpOptions)
      .subscribe((user: any) => {
        console.log(user);
        localStorage.setItem('access_token', user.access_token);
        console.log(user)
      });


  }

  public registrieren(): void {
    const dialogRef = this.dialog.open(RegistrierungsDialogComponent, {
      width: '300px',
      height: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
