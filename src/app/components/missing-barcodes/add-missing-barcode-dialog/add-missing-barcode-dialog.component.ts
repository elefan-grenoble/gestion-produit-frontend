import {Component, Inject, OnInit} from '@angular/core';
import {Article} from '../../../models/article';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-missing-barcode-dialog',
  templateUrl: './add-missing-barcode-dialog.component.html',
  styleUrls: ['./add-missing-barcode-dialog.component.scss']
})
export class AddMissingBarcodeDialogComponent implements OnInit {

  article: Article;
  newBarCode: number;

  constructor(
    public dialogRef: MatDialogRef<AddMissingBarcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.article = this.data.article;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.newBarCode);
  }

}
