import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../../models/article';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddTagPrintRequestsDialogComponent} from '../add-tag-print-requests-dialog/add-tag-print-requests-dialog.component';
import {TagsService} from '../../../services/tags.service';

@Component({
  selector: 'app-add-tag-print-requests-button',
  templateUrl: './add-tag-print-requests-button.component.html',
  styleUrls: ['./add-tag-print-requests-button.component.scss']
})
export class AddTagPrintRequestsButtonComponent implements OnInit {

  @Input() article: Article;

  constructor(public dialog: MatDialog,
              private tagService: TagsService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTagPrintRequestsDialogComponent, {
      width: '700px',
      data: {article: this.article}
    });
    dialogRef.afterClosed().subscribe(tagPrintRequest => {
      if (tagPrintRequest) { this.createTagPrintRequest(tagPrintRequest.quantity, tagPrintRequest.reason); }
    });
  }

  private createTagPrintRequest(quantity: number, reason: string) {
    this.tagService.addTagPrintRequest(this.article.code, quantity, reason).subscribe(
      _ => {
        this.snackBar.open('Demande d\'impression ajoutée', 'ok', {
          duration: 5000,
        });
      },
      err => {
        console.log(err);
        this.snackBar.open('Oups ! Une erreur s\'est produite!', 'ok', {
          duration: 5000,
          panelClass: 'error'
        });
      }
    );
  }

}
