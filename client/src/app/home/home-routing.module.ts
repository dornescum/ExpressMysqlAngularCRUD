import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizTypeComponent } from './quiz-type/quiz-type.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'quiz-type', pathMatch: 'full' },
      { path: 'quiz-type', component: QuizTypeComponent }
      // Add more routes for different quiz types if needed
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
