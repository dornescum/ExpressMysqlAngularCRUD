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
    // console.log('user ', this.user)
    this.route.paramMap.subscribe(params => {
      // console.log('params ', params)
      const moduleId = params?.get('id') as string;
      this.moduleId = moduleId;
      this.questionId = params.get('qid') as string;
      // Retrieve state data
      const stateData = history.state;

      // console.log('Module ID:', typeof moduleId);
      // console.log('Question ID:', this.questionId);
      // console.log('State Data:', stateData);
    });
    // this.getQuestion(this.moduleId, this.questionId);
    this.getNumbersOfQuestions();
    for(const q of this.questionsNumber){
      // this.qetQuestion()
      // console.log('q', q)

      this.getQuestion(this.moduleId, q);
    }

  }

  getQuestion(moduleId: any, questionId: any) {
    this.apiService.getQuestionById('modules', moduleId, questionId).subscribe((data: any) => {
      console.log('data', data)
      this.questionResponses = data;
      // console.log('questions responses', this.questionResponses)
      this.question = this.questionResponses[0].question;
      // console.log('q ', this.question)
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
    // console.log('current index ',this.currentQuestionIndex );
    if (this.currentQuestionIndex < this.questionsNumber.length) {
      // this.currentQuestionIndex++;
      console.log('index q ', this.currentQuestionIndex)
      const nextQuestionId = this.questionsNumber[this.currentQuestionIndex];

      console.log('next question ', nextQuestionId);

      this.getQuestion(this.moduleId, nextQuestionId);
      const payload = {question_id: nextQuestionId, response: this.userResponse, userId: this.user.id}; // Create the payload object
      this.apiService.postQuestionsIdResponse('modules', this.moduleId, payload).subscribe((response) => {
        console.log('Response from POST:', response);
      });
    } else {
      console.log('Quiz completed'); // All questions have been answered
      this.quizCompleted = true;

      // if (this.questionsNumber.length -1  === this.questionsNumber[this.questionsNumber.length - 1]){
      //   this.router.navigate(['/quiz/result']);
      // }
      // if (this.currentQuestionIndex === this.questionsNumber.length - 1) {
      //   console.log('index q ', this.currentQuestionIndex)
      //   this.router.navigate(['/quiz/result']);
      // }

      this.router.navigate(['/quiz/result']);

    }
  }

  getNumbersOfQuestions() {
    this.questionsNumber = this.storage.getItem('nid');
    console.log('questions numbers : ', this.questionsNumber);
    this.questionsNumberLastElement =this.questionsNumber[this.questionsNumber.length - 1];
    // console.log('questions numbers last element : ', this.questionsNumberLastElement);

  }

}
// getQuestion() {
//   this.apiService.getQuestionById('modules', this.moduleId, this.questionId).subscribe((data: any) => {
//     console.log('data', data)
//     this.questionResponses = data;
//     console.log('questions responses', this.questionResponses)
//     this.question = this.questionResponses[0].question;
//     console.log('q ', this.question)
//   })
// }
