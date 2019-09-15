import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../services/loading.service";
import {TagsService} from "../../services/tags.service";
import {TagPrintRequest} from "../../models/tag-print-request";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-tag-print-requests',
  templateUrl: './tag-print-requests.component.html',
  styleUrls: ['./tag-print-requests.component.scss']
})
export class TagPrintRequestsComponent implements OnInit {

  tagPrintRequests: TagPrintRequest[];

  displayedColumns: string[] = ['article', 'quantity', 'reason', 'actions'];

  constructor(private loadingService: LoadingService,
              private tagService: TagsService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadingService.taskStarted();
    this.tagService.getTagPrintRequests().subscribe(
      (tagPrintRequests: TagPrintRequest[]) => {
        this.tagPrintRequests = tagPrintRequests;
        this.loadingService.taskFinished()
      },
      err => {
        this.loadingService.taskFinished();
        console.log(err);
      }
    )
  }

  private cancelDelete(tagPrintRequest: TagPrintRequest) {
    this.loadingService.taskStarted();
    this.tagService.addTagPrintRequest(tagPrintRequest.article.code, tagPrintRequest.quantity, tagPrintRequest.reason).subscribe(
      (newTagPrintRequest: TagPrintRequest) => {
        this.loadingService.taskFinished();
        this.tagPrintRequests = this.tagPrintRequests.concat(newTagPrintRequest);
      },
      err => {
        this.loadingService.taskFinished();
        console.log(err);
        this.snackBar.open("Oups ! Une erreur s'est produite!", "ok", {
          duration: 5000,
          panelClass: 'error'
        });
      }
    )
  }

  delete(tagPrintRequest: TagPrintRequest) {
    this.loadingService.taskStarted();
    this.tagService.deleteTagPrintRequest(tagPrintRequest.id).subscribe(
      _ => {
        this.loadingService.taskFinished();
        this.tagPrintRequests = this.tagPrintRequests.filter(b => b.id !== tagPrintRequest.id);
        const snackRef = this.snackBar.open("Demande d'impression supprimée", "Annuler", {
          duration: 5000,
        });
        snackRef.afterDismissed().subscribe(info => {
          if (info.dismissedByAction === true) this.cancelDelete(tagPrintRequest);
        });
      },
      err => {
        this.loadingService.taskFinished();
        console.log(err);
        this.snackBar.open("Oups ! Une erreur s'est produite!", "ok", {
          duration: 5000,
          panelClass: 'error'
        });
      }
    )
  }

}
