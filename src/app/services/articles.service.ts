import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Article} from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articlesCache: Article[] | null = null;

  constructor(private http: HttpClient) {
  }

  getArticles(): Observable<Article[]> {
    // Return cached articles if available
    if (this.articlesCache) {
      return of(this.articlesCache);
    }

    // Otherwise fetch from API
    return this.http.get<Article[]>('/api/articles').pipe(
      tap(articles => {
        this.articlesCache = articles;  // Store in cache
      })
    );
  }

  getArticle(articleId: number): Observable<Article> {
    return this.http.get<Article>('/api/articles/' + articleId);
  }

  refreshArticles(): Observable<Article[]> {
    this.articlesCache = null;  // Clear cache
    return this.getArticles();
  }

}
