import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  // {
  //   path: 'quiz',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  // },
  {
    path: 'api-feature', // Use the new path here
    loadChildren: () => import('./api-feature/api-feature.module').then(m => m.ApiFeatureModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  { path: 'img-testing', loadChildren: () => import('./img-testing/img-testing.module').then(m => m.ImgTestingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
