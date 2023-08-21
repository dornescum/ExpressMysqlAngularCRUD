import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizTypeComponent } from './quiz-type/quiz-type.component';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [
    QuizTypeComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardModule,
    ButtonModule
  ]
})
export class HomeModule { }
