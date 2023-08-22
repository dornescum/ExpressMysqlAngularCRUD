import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {StorageService} from '../../services/storage.service';
import {Questions, User} from '../../components/models/user';
import {AuthService} from '../../services/auth.service';

// import {ConfirmationService} from 'primeng/api';

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

	constructor(private route: ActivatedRoute,
				private apiService: ApiService,
				private router: Router,
              private storage: StorageService,
				private authService: AuthService
	) {
	}

	ngOnInit() {
		this.user = this.authService.getUser();
		console.log('user ', this.user)
		// this.route.params.subscribe(params => {
		//   console.log('params ', params)
		// })

		this.route.paramMap.subscribe(params => {
			console.log('params ', params)
			const moduleId = params?.get('id') as string; // Retrieve the module ID from route parameter
			this.moduleId = moduleId;
			this.questionId = params.get('qid') as string; // Retrieve the question ID from route parameter

			// Retrieve state data
			const stateData = history.state;

			console.log('Module ID:', typeof moduleId);
			console.log('Question ID:', this.questionId);
			console.log('State Data:', stateData);
		});
		this.getQuestion();
    this.getNumbersOfQuestions();
	}

	getQuestion() {
		this.apiService.getQuestionById('modules', this.moduleId, this.questionId).subscribe((data: any) => {
			console.log('data', data)
			this.questionResponses = data;

			// this.question = [];
			// // this.question = data
			// for (const item of data) {
			//   console.log('item ', item)
			//   this.question.push(item);
			// }
			// console.log('', this.questionResponses)
			this.question = this.questionResponses[0].question;
			// console.log('q ', this.question)
		})
	}


	result(index: number) {
		const selectedChoice = this.questionResponses[index];
		if (selectedChoice.is_correct === 1) {
			console.log('Correct answer selected!');
			this.message = 'Correct answer selected!';
			// Do something to indicate the correct answer (e.g., change styling)
            this.userResponse = true;
		} else {
          this.userResponse = false;
			console.log('Incorrect answer selected.');
			this.message = 'Incorrect answer selected.'
			// Do something to indicate the incorrect answer (e.g., change styling)
		}

      const payload = {question_id: this.questionId, response: this.userResponse, userId: this.user.id}; // Create the payload object
      this.apiService.postQuestionsIdResponse('modules', this.moduleId, payload).subscribe((response) => {
        console.log('Response from POST:', response);
      });
	}

  getNumbersOfQuestions(){
    this.questionsNumber = this.storage.getItem('nid');
    console.log(this.questionsNumber)
  }

}
