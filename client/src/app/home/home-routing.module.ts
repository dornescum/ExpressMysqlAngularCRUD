import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizTypeComponent } from './quiz-type/quiz-type.component';
import {AuthGuardService} from "../services/auth-guard.service";
import {QuestionComponent} from './question/question.component';
import {ResultComponent} from "./result/result.component";
// FIXME routes for id
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'quiz-type/:id',
    component: QuizTypeComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'quiz-type/:id/:qid',
    component: QuestionComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'result',
    component: ResultComponent, canActivate: [AuthGuardService]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
