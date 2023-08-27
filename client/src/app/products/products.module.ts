import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import { ListProductsComponent } from './list-products/list-products.component';
import {CardModule} from "primeng/card";



@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ListProductsComponent
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
        CardModule
    ]
})
export class ProductsModule { }
