import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Questions} from '../../components/models/user'
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-quiz-type',
  templateUrl: './quiz-type.component.html',
  styleUrls: ['./quiz-type.component.scss']
})
export class QuizTypeComponent implements OnInit{

  moduleId!: number;
  moduleName!: string;
  questions!: any;
  questionsId = [];


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    console.log('ROUTE ', this.route)
    this.route.params.subscribe(params => {
      console.log('params ', params)
      this.moduleId = +params['id'];
      this.loadModuleData();
      // this.retrieveFilterIdFromQueryParams();
    });
    // this.retrieveFilterIdFromQueryParams();
  }



  loadModuleData(): void {
    // Use the moduleId to fetch data from the API
    this.apiService.getModuleById('modules',this.moduleId).subscribe((data: Questions) => {
      // console.log('DATA :', data);
      this.questions = data;
      this.questionsId = this.questions.map((question: number | any) => question.question_id);
      this.storage.setItem('nid',this.questionsId)
      console.log(' questions' ,this.questions)
      console.log('questionsId', this.questionsId);

    });
  }

  // retrieveFilterIdFromQueryParams(): void {
  //   this.route.queryParams.subscribe(queryParams => {
  //     // console.log('query params ', queryParams)
  //     if (queryParams['filterId']) {
  //       const filterId = JSON.parse(queryParams['filterId']);
  //       this.moduleId = filterId.module_id;
  //       console.log('id ', this.moduleId)
  //       this.moduleName = filterId.module_name; // Adjust property name accordingly
  //       console.log('Filter ID from query params:', filterId);
  //       this.loadModuleData();
  //     }
  //   });
  // }

  startQuiz(e: any){
    console.log('', e)
    console.log('module name', this.moduleName)
    if(e){
      // this.router.navigate(['/quiz/quiz-type/question', this.questionsId[0]], {state: this.moduleId});
      const navigationState = { moduleId: this.moduleId, moduleName: this.moduleName }; // Create an object with moduleId property
      this.router.navigate(['/quiz/quiz-type/question', this.questionsId[0]], { state: navigationState });
    }
  }

}
// const payload = { question_id: this.questionsId }; // Create the payload object
// this.apiService.postQuestionsId('modules', this.moduleId, payload).subscribe((response) => {
//   console.log('Response from POST:', response);
// });
