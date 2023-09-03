import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ApiFeatureRoutingModule } from './api-feature-routing.module';
import {ButtonModule} from "primeng/button";
import {NgxBarcode6Module} from "ngx-barcode6";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        ApiFeatureRoutingModule,
        ButtonModule,
        NgxBarcode6Module,
        SharedModule,
        TableModule
    ],
  providers: [DatePipe]
})
export class ApiFeatureModule { }
