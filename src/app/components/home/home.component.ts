import {Component, OnInit} from '@angular/core';

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
      url: '/supplying',
      label: 'Gérer le réapprovisonnement',
      icon: 'add_shopping_cart'
    },
    {
      url: '/delivery',
      label: 'Emplacements des stocks',
      icon: 'gps_fixed'
    },
    {
      url: '/missing-barcodes',
      label: 'Signaler un code barre manquant',
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

  constructor() {
  }

  ngOnInit() {
  }

}
