import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Article} from '../../models/article';
import {MatDialog, MatInput, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {LoadingService} from '../../services/loading.service';
import {AddSupplyingDialogComponent} from "../add-supplying-dialog/add-supplying-dialog.component";
import {SupplyingService} from "../../services/supplying.service";
import {Supplying} from "../../models/supplying";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['designation', 'famille', 'prix_vente', 'actions'];

  @ViewChild('searchInput', {static: true}) searchInput: MatInput;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<Article>;
  private filterPredicate = (article: Article, filter: string) => {
    return article.designation.toLowerCase().indexOf(filter) != -1 ||
      article.fournisseur.nom.toLowerCase().indexOf(filter) != -1 ||
      article.code.toString() === filter;
  };

  constructor(private articleService: ArticlesService,
              private loadingService: LoadingService,
              private supplyingService: SupplyingService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.loadingService.taskStarted();
    this.articleService.getArticles().subscribe(
      (articles: Article[]) => {
        this.dataSource = new MatTableDataSource(articles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.firstPage();
        this.dataSource.filterPredicate = this.filterPredicate;
        this.loadingService.taskFinished();
      },
      err => {
        console.error(err);
        this.loadingService.taskFinished();
      }
    )
  }

  ngAfterViewInit(): void {
    this.searchInput.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSupplyingDialog(article: Article) {
    this.loadingService.taskStarted();
    this.supplyingService.getSupplyingList().subscribe(
      (supplyings: Supplying[]) => {
        const currentSupplying = supplyings.find(s => s.article.code == article.code);
        this.loadingService.taskFinished();
        this.openAddOrUpdateSupplyingDialog(article, currentSupplying);
      },
      err => {
        console.log();
        this.loadingService.taskFinished();
      }
    );
  }

  private openAddOrUpdateSupplyingDialog(article: Article, supplying?: Supplying) {
    const dialogRef = this.dialog.open(AddSupplyingDialogComponent, {
      width: '700px',
      data: {article: article, currentSupplying: supplying}
    });
    dialogRef.afterClosed().subscribe((quantity: number | null) => {
      if (quantity && !supplying) this.addToSupplying(article, quantity);
      else if (quantity && supplying) {
        supplying.quantity = quantity;
        this.updateSupplying(supplying);
      }
    });
  }

  private addToSupplying(article: Article, quantity: number) {
    this.supplyingService.addToSupplyingList(article.code, quantity).subscribe((supplying: Supplying) => {
        this.snackBar.open('Article ajouté au réapprovisionnement', "ok", {
          duration: 5000,
        });
      }
    );
  }

  private updateSupplying(supplying: Supplying) {
    this.supplyingService.updateSupplying(supplying).subscribe(_ => {
        this.snackBar.open('Quantité à réapprovisionner mise à jour', "ok", {
          duration: 5000,
        });
      }
    );
  }

}
