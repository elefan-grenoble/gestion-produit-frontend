import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Article} from "../../../models/article";
import {AddMissingBarcodeDialogComponent} from "../add-missing-barcode-dialog/add-missing-barcode-dialog.component";
import {BarcodesService} from "../../../services/barcodes.service";
import {MissingBarcode} from "../../../models/missing-barcode";

@Component({
  selector: 'app-add-missing-barcode-button',
  templateUrl: './add-missing-barcode-button.component.html',
  styleUrls: ['./add-missing-barcode-button.component.scss']
})
export class AddMissingBarcodeButtonComponent implements OnInit {

  @Input() article: Article;

  constructor(public dialog: MatDialog,
              private barcodeService: BarcodesService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddMissingBarcodeDialogComponent, {
      width: '700px',
      data: {article: this.article}
    });
    dialogRef.afterClosed().subscribe((barcode: number | null) => {
      if (barcode) {
        this.barcodeService.addMissingBarcode(this.article.code, barcode).subscribe(
          _ => {
            this.snackBar.open('Code barre ajouté, en attente de traitement', "ok", {
              duration: 5000,
            });
          },
          err => {
            console.log(err);
            this.snackBar.open("Oups ! Une erreur s'est produite!", "ok", {
              duration: 5000,
              panelClass: 'error'
            });
          }
        )
      }
    });
  }

}
