import {Component, Input, OnInit} from '@angular/core';
import {Supplying} from "../../models/supplying";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddSupplyingDialogComponent} from "../add-supplying-dialog/add-supplying-dialog.component";
import {Article} from "../../models/article";
import {AddMissingBarcodeDialogComponent} from "../add-missing-barcode-dialog/add-missing-barcode-dialog.component";

@Component({
  selector: 'app-add-missing-barcode-button',
  templateUrl: './add-missing-barcode-button.component.html',
  styleUrls: ['./add-missing-barcode-button.component.scss']
})
export class AddMissingBarcodeButtonComponent implements OnInit {

  @Input() article: Article;

  constructor(public dialog: MatDialog,
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
        // TODO
      }
    });
  }

}
