import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Article} from "../../models/article";
import {Supplying} from "../../models/supplying";

interface DialogData {
  article: Article;
  currentSupplying?: Supplying;
}

@Component({
  selector: 'app-add-supplying-dialog',
  templateUrl: './add-supplying-dialog.component.html',
  styleUrls: ['./add-supplying-dialog.component.scss']
})
export class AddSupplyingDialogComponent implements OnInit {

  article: Article;
  currentSupplying?: Supplying;
  quantity: number;

  constructor(
    public dialogRef: MatDialogRef<AddSupplyingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.article = this.data.article;
    this.currentSupplying = this.data.currentSupplying;
    this.quantity = this.currentSupplying ? this.currentSupplying.quantity : 5;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.quantity);
  }

}
