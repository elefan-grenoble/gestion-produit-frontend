import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {SupplyingComponent} from "./components/supplying/supplying.component";
import {HomeComponent} from "./components/home/home.component";
import {AddSupplyingArticlesComponent} from "./components/add-supplying-articles/add-supplying-articles.component";
import {DeliveryComponent} from "./components/delivery/delivery.component";
import {MissingBarcodesComponent} from "./components/missing-barcodes/missing-barcodes.component";
import {AddMissingBarcodeArticlesComponent} from "./components/add-missing-barcode-articles/add-missing-barcode-articles.component";
import {TagPrintRequestsComponent} from "./components/tag-print-requests/tag-print-requests.component";
import {AddTagPrintRequestsArticlesComponent} from "./components/add-tag-print-requests-articles/add-tag-print-requests-articles.component";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: '', component: HomeComponent, data: {breadcrumb: {label: 'Accueil', icon: 'home'}}},
      {path: 'supplying', component: SupplyingComponent, data: {breadcrumb: {label: 'Produits à réapprovisionner', icon: 'add_shopping_cart'}}},
      {path: 'add-supplying', component: AddSupplyingArticlesComponent},
      {path: 'delivery', component: DeliveryComponent},
      {path: 'missing-barcodes', component: MissingBarcodesComponent},
      {path: 'add-missing-barcode', component: AddMissingBarcodeArticlesComponent},
      {path: 'tag-print-requests', component: TagPrintRequestsComponent},
      {path: 'add-tag-print-request', component: AddTagPrintRequestsArticlesComponent}
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
