import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-quiz-type',
  templateUrl: './quiz-type.component.html',
  styleUrls: ['./quiz-type.component.scss']
})
export class QuizTypeComponent implements OnInit{

  moduleId!: number;
  moduleName!: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Get the 'id' parameter from the URL
    this.route.params.subscribe(params => {
      console.log('params ', params)
      this.moduleId = +params['id'];
      this.loadModuleData();
    });
  }

  loadModuleData(): void {
    // Use the moduleId to fetch data from the API
    this.apiService.getModuleById(this.moduleName,this.moduleId).subscribe(data => {
      // Process the fetched data
      console.log(data); // Display fetched data
    });
  }

}
