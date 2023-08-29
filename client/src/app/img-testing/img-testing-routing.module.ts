import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImgTestingComponent } from './img-testing.component';

const routes: Routes = [{ path: '', component: ImgTestingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImgTestingRoutingModule { }
