import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Article} from '../../models/article';
import {MatTableDataSource} from '@angular/material';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {


  displayedColumns: string[] = ['code', 'famille', 'designation', 'fournisseur', 'prix_vente'];

  dataSource: MatTableDataSource<Article>;

  constructor(private articleService: ArticlesService,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.taskStarted();
    this.articleService.getArticles().subscribe(
      (articles: Article[]) => {
        this.dataSource = new MatTableDataSource(articles);
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
  }

}
