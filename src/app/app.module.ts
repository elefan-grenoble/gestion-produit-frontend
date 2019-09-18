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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {SupplyingComponent} from "./components/supplying/supplying.component";
import { AddSupplyingDialogComponent } from './components/supplying/add-supplying-dialog/add-supplying-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { AddSupplyingButtonComponent } from './components/supplying/add-supplying-button/add-supplying-button.component';
import { AddSupplyingArticlesComponent } from './components/supplying/add-supplying-articles/add-supplying-articles.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { MissingBarcodesComponent } from './components/missing-barcodes/missing-barcodes.component';
import { AddMissingBarcodeArticlesComponent } from './components/missing-barcodes/add-missing-barcode-articles/add-missing-barcode-articles.component';
import { AddMissingBarcodeButtonComponent } from './components/missing-barcodes/add-missing-barcode-button/add-missing-barcode-button.component';
import { AddMissingBarcodeDialogComponent } from './components/missing-barcodes/add-missing-barcode-dialog/add-missing-barcode-dialog.component';
import { TagPrintRequestsComponent } from './components/tag-print-requests/tag-print-requests.component';
import { AddTagPrintRequestsArticlesComponent } from './components/tag-print-requests/add-tag-print-requests-articles/add-tag-print-requests-articles.component';
import { AddTagPrintRequestsDialogComponent } from './components/tag-print-requests/add-tag-print-requests-dialog/add-tag-print-requests-dialog.component';
import { AddTagPrintRequestsButtonComponent } from './components/tag-print-requests/add-tag-print-requests-button/add-tag-print-requests-button.component';
import {MatSelectModule} from "@angular/material/select";

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticlesComponent,
    PageNotFoundComponent,
    SupplyingComponent,
    AddSupplyingDialogComponent,
    HomeComponent,
    AddSupplyingButtonComponent,
    AddSupplyingArticlesComponent,
    BreadcrumbComponent,
    DeliveryComponent,
    MissingBarcodesComponent,
    AddMissingBarcodeArticlesComponent,
    AddMissingBarcodeButtonComponent,
    AddMissingBarcodeDialogComponent,
    TagPrintRequestsComponent,
    AddTagPrintRequestsArticlesComponent,
    AddTagPrintRequestsDialogComponent,
    AddTagPrintRequestsButtonComponent
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
    MatSnackBarModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    AddSupplyingDialogComponent,
    AddMissingBarcodeDialogComponent,
    AddTagPrintRequestsDialogComponent
  ]
})
export class AppModule {
}
