import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgTestingRoutingModule } from './img-testing-routing.module';
import { ImgTestingComponent } from './img-testing.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PasswordModule} from 'primeng/password';


@NgModule({
  declarations: [
    ImgTestingComponent
  ],
  imports: [
    CommonModule,
    ImgTestingRoutingModule,
    ReactiveFormsModule,
    PasswordModule
  ]
})
export class ImgTestingModule { }
