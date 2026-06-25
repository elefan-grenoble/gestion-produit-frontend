import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap, shareReplay} from 'rxjs/operators';
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

    // Otherwise fetch from API - share the request among multiple subscribers
    return this.http.get<Article[]>('/api/articles').pipe(
      tap(articles => {
        // Store in cache
        this.articlesCache = articles;
      }),
      // Share the same request if multiple subscribers
      shareReplay(1)
    );
  }

  getArticle(articleId: number): Observable<Article> {
    return this.http.get<Article>('/api/articles/' + articleId);
  }

  refreshArticles(): Observable<Article[]> {
    // Clear cache and fetch fresh articles from API
    this.articlesCache = null;
    return this.getArticles();
  }

}
