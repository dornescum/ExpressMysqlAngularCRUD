import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products.component';
import {ProductComponent} from './product/product.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {AuthCookieGuard} from "../services/auth-cookie.guard";
import {ListProductsComponent} from './list-products/list-products.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {SearchProductsComponent} from './search-products/search-products.component';

const routes: Routes = [
  {path: '', component: ProductsComponent, canActivate: [AuthGuardService]},
  {path: 'product-list', component: ListProductsComponent, canActivate: [AuthCookieGuard]},
  {path: 'search-products', component: SearchProductsComponent, canActivate: [AuthCookieGuard]},
  {path: 'product/:id', component: ProductComponent, canActivate: [AuthGuardService]},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class ProductsRoutingModule {
}
