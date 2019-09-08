import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../models/article";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddTagPrintRequestsDialogComponent} from "../add-tag-print-requests-dialog/add-tag-print-requests-dialog.component";

@Component({
  selector: 'app-add-tag-print-requests-button',
  templateUrl: './add-tag-print-requests-button.component.html',
  styleUrls: ['./add-tag-print-requests-button.component.scss']
})
export class AddTagPrintRequestsButtonComponent implements OnInit {

  @Input() article: Article;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTagPrintRequestsDialogComponent, {
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
