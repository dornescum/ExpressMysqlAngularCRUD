import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizTypeComponent } from './quiz-type/quiz-type.component';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { QuestionComponent } from './question/question.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import { ResultComponent } from './result/result.component';



@NgModule({
  declarations: [
    QuizTypeComponent,
    HomeComponent,
    QuestionComponent,
    ResultComponent
  ],
	imports: [
		CommonModule,
		HomeRoutingModule,
		CardModule,
		ButtonModule,
		RadioButtonModule,
		ConfirmDialogModule,
		DialogModule
	]
})
export class HomeModule { }
