import {Injectable} from '@angular/core';
import {UserStatus} from '../guards/auth.guard';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) {
  }

  private _userStatusSubject: BehaviorSubject<UserStatus> = new BehaviorSubject<UserStatus>(null);

  get userStatusSubject(): BehaviorSubject<UserStatus> {
    return this._userStatusSubject;
  }

  updateUserStatus(status: UserStatus) {
    this._userStatusSubject.next(status);
  }

  disconnect(status: UserStatus): void {
    this.http.get<any>(status.disconnect_url).subscribe(
      (ret: any) => {
        this.updateUserStatus(null);
        window.location.href = status.logout_page_url;
      },
      err => {
        console.error(err);
      }
    );
  }
}
