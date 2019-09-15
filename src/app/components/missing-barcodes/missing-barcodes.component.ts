import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../services/loading.service";
import {BarcodesService} from "../../services/barcodes.service";
import {MissingBarcode} from "../../models/missing-barcode";
import {logger} from "codelyzer/util/logger";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-missing-barcodes',
  templateUrl: './missing-barcodes.component.html',
  styleUrls: ['./missing-barcodes.component.scss']
})
export class MissingBarcodesComponent implements OnInit {

  barcodes: MissingBarcode[];

  displayedColumns: string[] = ['article', 'barcode', 'actions'];

  constructor(private loadingService: LoadingService,
              private barcodeService: BarcodesService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadingService.taskStarted();
    this.barcodeService.getMissingBarcodes().subscribe(
      (barcodes: MissingBarcode[]) => {
        this.barcodes = barcodes;
        this.loadingService.taskFinished();
      },
      err => {
        logger.error(err);
        this.loadingService.taskStarted();
      }
    )
  }

  private cancelDelete(barcode: MissingBarcode) {
    this.loadingService.taskStarted();
    this.barcodeService.addMissingBarcode(barcode.article.code, barcode.barcode).subscribe(
      (newBarcode: MissingBarcode) => {
        this.loadingService.taskFinished();
        this.barcodes = this.barcodes.concat(newBarcode);
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

  delete(barcode: MissingBarcode) {
    this.loadingService.taskStarted();
    this.barcodeService.deleteMissingBarcode(barcode.id).subscribe(
      _ => {
        this.loadingService.taskFinished();
        this.barcodes = this.barcodes.filter(b => b.id !== barcode.id);
        const snackRef = this.snackBar.open("Code barre supprimé", "Annuler", {
          duration: 5000,
        });
        snackRef.afterDismissed().subscribe(info => {
          if (info.dismissedByAction === true) this.cancelDelete(barcode);
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
