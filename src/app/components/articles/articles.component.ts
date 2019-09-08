import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
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

  actionColumnTitle: string = 'Actions';

  @Input() feature: string;

  @ViewChild('searchInput', {static: true}) searchInput: MatInput;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<Article>;

  private filterPredicate = (article: Article, filter: string) => {
    return article.designation.toLowerCase().indexOf(filter) != -1 ||
      article.fournisseur.nom.toLowerCase().indexOf(filter) != -1 ||
      article.code.toString() === filter;
  };

  constructor(private articleService: ArticlesService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.loadArticles();
    if (this.feature === 'supplying') {
      this.actionColumnTitle = "Ajouter";

    } else {
      this.displayedColumns = ['designation', 'famille', 'prix_vente'];
      console.error("Unknown feature : " + this.feature);
    }
  }

  private loadArticles() {
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

}
