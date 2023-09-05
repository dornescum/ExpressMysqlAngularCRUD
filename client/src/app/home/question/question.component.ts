import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {StorageService} from '../../services/storage.service';
import {Questions, User} from '../../components/models/user';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-question', templateUrl: './question.component.html', styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questionId!: string;
  moduleId = '';
  questionResponses: Questions[] = [];
  question!: any;
  message = '';
  userResponse!: boolean;
  user!: User;
  questionsNumber!: any;
  currentQuestionIndex: number = -1; // altfel sare peste primul element
  questionsNumberLastElement!: number;
  quizCompleted!: boolean;


  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private router: Router,
              private storage: StorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.route.paramMap.subscribe(params => {
      // console.log('params ', params)
      const moduleId = params?.get('id') as string;
      this.moduleId = moduleId;
      this.questionId = params.get('qid') as string;
      const stateData = history.state;
    });

    this.getNumbersOfQuestions();
    for(const q of this.questionsNumber){
      this.getQuestion(this.moduleId, q);
    }

  }

  getQuestion(moduleId: any, questionId: any) {
    this.apiService.getQuestionById('modules', moduleId, questionId).subscribe((data: any) => {
      this.questionResponses = data;
      this.question = this.questionResponses[0].question;
    })
  }


  result(index: number) {
    this.quizCompleted = false;
    const selectedChoice = this.questionResponses[index];
    if (selectedChoice.is_correct === 1) {
      this.message = 'Correct answer selected!';
      this.userResponse = true;
    } else {
      this.userResponse = false;
      this.message = 'Incorrect answer selected.'
    }

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questionsNumber.length) {
      // this.currentQuestionIndex++;
      const nextQuestionId = this.questionsNumber[this.currentQuestionIndex];
      this.getQuestion(this.moduleId, nextQuestionId);
      const payload = {question_id: nextQuestionId, response: this.userResponse, userId: this.user.id};
      this.apiService.postQuestionsIdResponse('modules', this.moduleId, payload).subscribe((response) => {
      });
    } else {
      this.quizCompleted = true;
      this.router.navigate(['/quiz/result']);
    }
  }

  getNumbersOfQuestions() {
    this.questionsNumber = this.storage.getItem('nid');
    this.questionsNumberLastElement =this.questionsNumber[this.questionsNumber.length - 1];
  }

}

