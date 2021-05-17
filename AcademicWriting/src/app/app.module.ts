import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogElementsExampleDialogComponent, EditorComponent} from './editor/editor.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { CountDownComponent } from './editor/components/count-down/count-down.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    CountDownComponent,
    DialogElementsExampleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
