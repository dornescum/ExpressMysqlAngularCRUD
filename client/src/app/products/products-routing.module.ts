import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products.component';
import {ProductComponent} from './product/product.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {ListProductsComponent} from './list-products/list-products.component';

const routes: Routes = [
  {path: '', component: ProductsComponent, canActivate: [AuthGuardService]},
  {path: 'product-list', component: ListProductsComponent, canActivate: [AuthGuardService]},
  {path: 'product/:id', component: ProductComponent, canActivate: [AuthGuardService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class ProductsRoutingModule {
}
