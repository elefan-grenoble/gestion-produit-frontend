import {Component, OnInit, ViewChild} from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Article} from '../../models/article';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {LoadingService} from '../../services/loading.service';
import {AddSupplyingDialogComponent} from "../add-supplying-dialog/add-supplying-dialog.component";
import {SupplyingService} from "../../services/supplying.service";
import {Supplying} from "../../models/supplying";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {


  displayedColumns: string[] = ['designation', 'famille', 'prix_vente', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<Article>;


  constructor(private articleService: ArticlesService,
              private loadingService: LoadingService,
              private supplyingService: SupplyingService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadingService.taskStarted();
    this.articleService.getArticles().subscribe(
      (articles: Article[]) => {
        this.dataSource = new MatTableDataSource(articles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.firstPage();
        this.loadingService.taskFinished();
      },
      err => {
        console.error(err);
        this.loadingService.taskFinished();
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addToSupplying(article: Article) {
    const dialogRef = this.dialog.open(AddSupplyingDialogComponent, {
      width: '800px',
      data: {article: article}
    });

    dialogRef.afterClosed().subscribe((quantity: number | null) => {
      if (quantity) {
        this.supplyingService.addToSupplyingList(article.code, quantity).subscribe(
          (supplying: Supplying) => {
            console.log(supplying);
          }
        );
      }
    });
  }

}
