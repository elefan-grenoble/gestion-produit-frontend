import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../services/loading.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  progressBarMode = 'determinate';

  private subscription: Subscription;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit() {
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
  }

}
