import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) {
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('/api/articles');
  }

  getArticle(articleId: number): Observable<Article> {
    return this.http.get<Article>('/api/articles/' + articleId);
  }

}
