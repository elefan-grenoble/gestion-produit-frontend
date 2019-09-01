import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {ArticlesComponent} from './components/articles/articles.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDialogModule, MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule, MatSnackBarModule,
  MatTableModule, MatTooltipModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {SupplyingComponent} from "./components/supplying/supplying.component";
import { AddSupplyingDialogComponent } from './components/add-supplying-dialog/add-supplying-dialog.component';
import { HomeComponent } from './components/home/home.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticlesComponent,
    PageNotFoundComponent,
    SupplyingComponent,
    AddSupplyingDialogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    AddSupplyingDialogComponent
  ]
})
export class AppModule {
}
