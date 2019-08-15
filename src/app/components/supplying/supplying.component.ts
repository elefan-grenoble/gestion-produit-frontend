import {Component, OnDestroy, OnInit} from '@angular/core';
import {SupplyingService} from "../../services/supplying.service";
import {Supplying} from "../../models/supplying";
import {DatePipe} from "@angular/common";
import {Subscription, timer} from "rxjs";
import {switchMap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-supplying',
  templateUrl: './supplying.component.html',
  styleUrls: ['./supplying.component.scss']
})
export class SupplyingComponent implements OnInit, OnDestroy {

  supplyingList: Supplying[];

  displayedColumns: string[] = ['designation', 'emplacement', 'quantity', 'actions'];

  private subscription: Subscription;

  constructor(private supplyingService: SupplyingService,
              private datePipe: DatePipe,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.subscription = timer(0, 10000).pipe(
      switchMap(_ => this.supplyingService.getSupplyingList())).subscribe(
      (supplyingList: Supplying[]) => this.supplyingList = supplyingList
    );
  }

  private reload() {
    this.supplyingService.getSupplyingList().subscribe(
      (supplyingList: Supplying[]) => this.supplyingList = supplyingList
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private nowString() {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  private cancel(supplying: Supplying) {
    supplying.supply_date = null;
    supplying.out_of_stock = false;
    this.supplyingService.updateSupplying(supplying).subscribe(_ => this.reload());
  }

  private updateSupplying(supplying: Supplying, message: string) {
    this.supplyingService.updateSupplying(supplying).subscribe(
      _ => {
        this.reload();
        const snackRef = this.snackBar.open(message, "Annuler", {
          duration: 5000,
        });
        snackRef.afterDismissed().subscribe(info => {
          if (info.dismissedByAction === true) {
            this.cancel(supplying);
          }
        });
      }
    );
  }

  supplied(supplying: Supplying) {
    supplying.supply_date = this.nowString();
    this.updateSupplying(supplying, "Article réapprovisioné");
  }

  notSupplied(supplying: Supplying) {
    supplying.supply_date = this.nowString();
    supplying.out_of_stock = true;
    this.updateSupplying(supplying, "Article non trouvé");
  }

}
