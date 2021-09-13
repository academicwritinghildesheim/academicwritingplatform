import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {RegistrierungsDialogComponent} from '../registrierungs-dialog/registrierungs-dialog.component';

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
