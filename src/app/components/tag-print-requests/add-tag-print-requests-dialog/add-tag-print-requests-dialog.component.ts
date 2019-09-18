import {Component, Inject, OnInit} from '@angular/core';
import {Article} from "../../../models/article";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-tag-print-requests-dialog',
  templateUrl: './add-tag-print-requests-dialog.component.html',
  styleUrls: ['./add-tag-print-requests-dialog.component.scss']
})
export class AddTagPrintRequestsDialogComponent implements OnInit {

  article: Article;
  quantity: number;
  reason: string;

  possibleReasons: string[] = [
    "Etiquette manquante",
    "Prix erroné"
  ];

  constructor(
    public dialogRef: MatDialogRef<AddTagPrintRequestsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.article = this.data.article;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close({
      quantity: this.quantity,
      reason: this.reason
    });
  }


}
