import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ApiFeatureRoutingModule } from './api-feature-routing.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ApiFeatureRoutingModule
  ]
})
export class ApiFeatureModule { }
