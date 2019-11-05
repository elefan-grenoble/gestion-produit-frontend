import {Injectable} from '@angular/core';
import {UserStatus} from '../guards/auth.guard';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  private _userStatusSubject: BehaviorSubject<UserStatus> = new BehaviorSubject<UserStatus>(null);

  get userStatusSubject(): BehaviorSubject<UserStatus> {
    return this._userStatusSubject;
  }

  updateUserStatus(status: UserStatus) {
    this._userStatusSubject.next(status);
  }

}
