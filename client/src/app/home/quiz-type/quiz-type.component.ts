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
    this.route.params.subscribe(params => {
      this.moduleId = +params['id'];
      this.loadModuleData();
    });
  }


  loadModuleData(): void {
    this.apiService.getModuleById('modules',this.moduleId).subscribe((data: Questions) => {
      this.questions = data;
      this.questionsId = this.questions.map((question: number | any) => question.question_id);
      this.storage.setItem('nid',this.questionsId)
    });
  }


  startQuiz(e: any){
    if(e){
      const navigationState = { moduleId: this.moduleId, moduleName: this.moduleName }; // Create an object with moduleId property
      this.router.navigate(['/quiz/quiz-type/question', this.questionsId[0]], { state: navigationState });
    }
  }
}
