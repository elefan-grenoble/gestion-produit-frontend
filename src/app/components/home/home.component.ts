import {Component, OnInit} from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {LoadingService} from '../../services/loading.service';

export interface MenuItem {
  url: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      url: '/list',
      label: 'Tous les produits',
      icon: 'view_list'
    }
  ];

  menuItemsOther: MenuItem[] = [
    {
      url: '/supplying',
      label: 'Gérer le réapprovisionnement',
      icon: 'add_shopping_cart'
    },
    {
      url: '/delivery',
      label: 'Emplacements des stocks',
      icon: 'gps_fixed'
    },
    {
      url: '/missing-barcodes',
      label: 'Signaler un code-barres manquant',
      icon: 'playlist_add'
    },
    {
      url: '/tag-print-requests',
      label: 'Demander une impression d\'étiquette',
      icon: 'print'
    },
    {
      url: '/stock',
      label: 'Consulter la quantité de produits en stock',
      icon: 'chrome_reader_mode'
    }
  ];

  constructor(private articleService: ArticlesService, private loadingService: LoadingService) {
  }

  ngOnInit() {
    // Preload articles in the background
    this.loadingService.taskStarted();
    this.articleService.getArticles().subscribe(
      () => {
        this.loadingService.taskFinished();
      },
      err => {
        console.error(err);
        this.loadingService.taskFinished();
      }
    );
  }

}
