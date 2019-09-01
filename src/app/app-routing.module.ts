import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticlesComponent} from './components/articles/articles.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {SupplyingComponent} from "./components/supplying/supplying.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: '', component: HomeComponent},
      {path: 'articles', component: ArticlesComponent},
      {path: 'supplying', component: SupplyingComponent}
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
