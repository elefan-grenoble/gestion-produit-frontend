import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../../models/article';
import {Supplying} from '../../../models/supplying';
import {LoadingService} from '../../../services/loading.service';
import {SupplyingService} from '../../../services/supplying.service';
import {AddSupplyingDialogComponent} from '../add-supplying-dialog/add-supplying-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-supplying-button',
  templateUrl: './add-supplying-button.component.html',
  styleUrls: ['./add-supplying-button.component.scss']
})
export class AddSupplyingButtonComponent implements OnInit {

  @Input() article: Article;

  constructor(private loadingService: LoadingService,
              private supplyingService: SupplyingService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  openSupplyingDialog() {
    this.loadingService.taskStarted();
    this.supplyingService.getSupplyingList().subscribe(
      (supplyings: Supplying[]) => {
        const currentSupplying = supplyings.find(s => s.article.code == this.article.code);
        this.loadingService.taskFinished();
        this.openAddOrUpdateSupplyingDialog(currentSupplying);
      },
      err => {
        console.log();
        this.loadingService.taskFinished();
      }
    );
  }

  private openAddOrUpdateSupplyingDialog(supplying?: Supplying) {
    const dialogRef = this.dialog.open(AddSupplyingDialogComponent, {
      width: '700px',
      data: {article: this.article, currentSupplying: supplying}
    });
    dialogRef.afterClosed().subscribe((quantity: number | null) => {
      if (quantity && !supplying) { this.addToSupplying(quantity); }
      else if (quantity && supplying) {
        supplying.quantity = quantity;
        this.updateSupplying(supplying);
      }
    });
  }

  private addToSupplying(quantity: number) {
    this.supplyingService.addToSupplyingList(this.article.code, quantity).subscribe((supplying: Supplying) => {
        this.snackBar.open('Article ajouté au réapprovisionnement', 'ok', {
          duration: 5000,
        });
      }
    );
  }

  private updateSupplying(supplying: Supplying) {
    this.supplyingService.updateSupplying(supplying).subscribe(_ => {
        this.snackBar.open('Quantité à réapprovisionner mise à jour', 'ok', {
          duration: 5000,
        });
      }
    );
  }

}
