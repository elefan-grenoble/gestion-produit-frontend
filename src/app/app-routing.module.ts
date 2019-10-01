import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {SupplyingComponent} from "./components/supplying/supplying.component";
import {HomeComponent} from "./components/home/home.component";
import {AddSupplyingArticlesComponent} from "./components/supplying/add-supplying-articles/add-supplying-articles.component";
import {DeliveryComponent} from "./components/delivery/delivery.component";
import {MissingBarcodesComponent} from "./components/missing-barcodes/missing-barcodes.component";
import {AddMissingBarcodeArticlesComponent} from "./components/missing-barcodes/add-missing-barcode-articles/add-missing-barcode-articles.component";
import {TagPrintRequestsComponent} from "./components/tag-print-requests/tag-print-requests.component";
import {AddTagPrintRequestsArticlesComponent} from "./components/tag-print-requests/add-tag-print-requests-articles/add-tag-print-requests-articles.component";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], data: {breadcrumb: {label: 'Accueil', icon: 'home'}}, children: [
      {path: '', component: HomeComponent},
      {
        path: 'supplying',
        data: {breadcrumb: {label: 'Produits à réapprovisionner', icon: 'add_shopping_cart'}},
        children: [
          {path: '', component: SupplyingComponent},
          {
            path: 'add',
            component: AddSupplyingArticlesComponent,
            data: {breadcrumb: {label: 'Ajouter', icon: 'add'}}
          }
        ]
      },
      {
        path: 'delivery',
        data: {breadcrumb: {label: 'Emplacements des stocks', icon: 'gps_fixed'}},
        component: DeliveryComponent
      },
      {
        path: 'missing-barcodes', data: {breadcrumb: {label: 'Codes barres manquants', icon: 'playlist_add'}}, children: [
          {path: '', component: MissingBarcodesComponent},
          {
            path: 'add',
            component: AddMissingBarcodeArticlesComponent,
            data: {breadcrumb: {label: 'Ajouter', icon: 'add'}}
          }
        ]
      },
      {
        path: 'tag-print-requests', data: {breadcrumb: {label: 'Demandes d\'étiquettes', icon: 'print'}}, children: [
          {path: '', component: TagPrintRequestsComponent},
          {
            path: 'add',
            component: AddTagPrintRequestsArticlesComponent,
            data: {breadcrumb: {label: 'Ajouter', icon: 'add'}}
          }
        ]
      }
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
