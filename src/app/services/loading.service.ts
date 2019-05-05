import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loads = 0;
  private showProgressSubject = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  taskStarted() {
    this.loads += 1;
    this.emitSubject();
  }

  taskFinished() {
    this.loads -= 1;
    if (this.loads < 0) this.loads = 0;
    this.emitSubject();
  }

  getSubject(): Observable<boolean> {
    return this.showProgressSubject.asObservable();
  }

  emitSubject() {
    this.showProgressSubject.next(this.loads > 0);
  }

}
