import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

export interface BreadCrumb {
  icon: string;
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  private routeSubscription: Subscription;

  breadcrumbs: BreadCrumb[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd)).subscribe(
        event => {
          this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
        }
      );
  }

  private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    let nextUrl = url;
    let newBreadcrumbs = breadcrumbs;
    if (route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb']) {
      const breadcrumbRouteData = route.routeConfig.data['breadcrumb'];
      nextUrl = `${url}${route.routeConfig.path}/`;
      const breadcrumb: BreadCrumb = {
        icon: breadcrumbRouteData.icon,
        label: breadcrumbRouteData.label,
        url: nextUrl
      };
      newBreadcrumbs = [...breadcrumbs, breadcrumb];
    }
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
