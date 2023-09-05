import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';


import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import { ListProductsComponent } from './list-products/list-products.component';
import {CardModule} from "primeng/card";
import {ChipModule} from 'primeng/chip';


import { NgxBarcode6Module } from 'ngx-barcode6';
import {TableModule} from "primeng/table";
import {ImageModule} from 'primeng/image';
import { SearchProductsComponent } from './search-products/search-products.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ListProductsComponent,
    SearchProductsComponent
  ],
	imports: [
		CommonModule,
		ProductsRoutingModule,
		ReactiveFormsModule,
		ButtonModule,
		InputTextModule,
		DropdownModule,
		InputTextareaModule,
		FileUploadModule,
		CardModule,
		ChipModule,
		NgxBarcode6Module,
		FormsModule,
		TableModule,
		ImageModule
	],
  providers: [DatePipe]
})
export class ProductsModule { }
