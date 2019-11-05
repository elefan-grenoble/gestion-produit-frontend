import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../services/loading.service';
import {Subscription} from 'rxjs';
import {SessionService} from '../../services/session.service';
import {UserStatus} from '../../guards/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  progressBarMode = 'determinate';

  private subscription: Subscription;
  private userStatusSubscription: Subscription;

  userStatus: UserStatus;

  constructor(private loadingService: LoadingService, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.userStatusSubscription = this.sessionService.userStatusSubject.subscribe(
      (userStatus: UserStatus) => this.userStatus = userStatus
    );
    this.subscription = this.loadingService.getSubject().subscribe(
      (show: boolean) => {
        if (show) this.showProgress(); else this.hideProgress();
      }
    );
  }

  private showProgress() {
    this.progressBarMode = 'indeterminate';
  }

  private hideProgress() {
    this.progressBarMode = 'determinate';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userStatusSubscription.unsubscribe();
  }

}
