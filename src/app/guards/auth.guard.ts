import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface UserStatus {
  logged: boolean;
  oauth_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private http: HttpClient) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.http.get<UserStatus>('/api/user/status').pipe(map(
      (userStatus: UserStatus) => {
        if (userStatus.logged) {
          return true;
        } else {
          location.href = userStatus.oauth_url;
          return false;
        }
      }
    ));
  }

}
