import {Injectable} from '@angular/core';
import {UserStatus} from '../guards/auth.guard';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ArticlesService} from './articles.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient, private articlesService: ArticlesService) {
  }

  private _userStatusSubject: BehaviorSubject<UserStatus> = new BehaviorSubject<UserStatus>(null);

  get userStatusSubject(): BehaviorSubject<UserStatus> {
    return this._userStatusSubject;
  }

  updateUserStatus(status: UserStatus) {
    // Clear cache when user status changes (sign in/out)
    if (status !== this._userStatusSubject.value) {
      this.articlesService.refreshArticles().subscribe();
    }
    this._userStatusSubject.next(status);
  }

  disconnect(status: UserStatus): void {
    this.http.get<any>(status.disconnect_url).subscribe(
      (ret: any) => {
        // Clear cache on disconnect
        this.articlesService.refreshArticles().subscribe();
        this.updateUserStatus(null);
        window.location.href = status.logout_page_url;
      },
      err => {
        console.error(err);
      }
    );
  }
}
