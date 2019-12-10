import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {SessionService} from '../services/session.service';

export interface UserStatus {
  logged: boolean;
  oauth_url: string;
  disconnect_url: string;
  logout_page_url: string;
  vip_ip: boolean;
  user?: User;
}

export interface User {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router, private sessionService: SessionService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.http.get<UserStatus>('/api/user/status').pipe(map(
      (userStatus: UserStatus) => {
        if (userStatus.logged) {
          this.sessionService.updateUserStatus(userStatus);
          return true;
        } else {
          const url = this.router.parseUrl(userStatus.oauth_url);
          url.queryParams['return_to'] = location.origin + state.url;
          location.href = this.router.serializeUrl(url);
          return false;
        }
      }
    ));
  }

}
