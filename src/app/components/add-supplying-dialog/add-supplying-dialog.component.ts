import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Article} from "../../models/article";

interface DialogData {
  article: Article;
}

@Component({
  selector: 'app-add-supplying-dialog',
  templateUrl: './add-supplying-dialog.component.html',
  styleUrls: ['./add-supplying-dialog.component.scss']
})
export class AddSupplyingDialogComponent implements OnInit {

  article: Article;
  quantity = 5;

  constructor(
    public dialogRef: MatDialogRef<AddSupplyingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.article = this.data.article;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.quantity);
  }

}
