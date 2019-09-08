import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {SupplyingComponent} from "./components/supplying/supplying.component";
import {HomeComponent} from "./components/home/home.component";
import {AddSupplyingArticlesComponent} from "./components/add-supplying-articles/add-supplying-articles.component";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: '', component: HomeComponent},
      {path: 'supplying', component: SupplyingComponent},
      {path: 'add-supplying', component: AddSupplyingArticlesComponent}
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
