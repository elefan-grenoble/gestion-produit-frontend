import {Component, OnInit, ViewChild} from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Article} from '../../models/article';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {LoadingService} from '../../services/loading.service';
import {interval} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {


  displayedColumns: string[] = ['designation', 'prix_vente', 'emplacement', 'rayon', 'stocks'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Article>;


  constructor(private articleService: ArticlesService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    interval(2 * 3600 * 1000)
      .pipe(
        startWith(0),
        map(() => this.loadingService.taskStarted()),
        switchMap(() => this.articleService.getArticles())
      )
      .subscribe(
        (articles: Article[]) => {
          this.dataSource = new MatTableDataSource(articles);
          this.dataSource.paginator = this.paginator;
          this.dataSource.paginator.firstPage();
          this.loadingService.taskFinished();
        },
        err => {
          console.error(err);
          this.loadingService.taskFinished();
        });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
