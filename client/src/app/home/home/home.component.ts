import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";
import {ApiService} from '../../services/api.service';
import {environment} from '../../../enviroments/enviroment';
import {Modules, User} from '../../components/models/user';


// const url = environment.apiUrl

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  user!: User;
  userSessionStorage!:string | null;
  modules!: Modules[];
  moduleRequirement = 'modules';

  constructor(private authService: AuthService, private token: TokenService, private router: Router, public apiService: ApiService) {
  }
  ngOnInit(){
    this.user = this.authService.getUser();
    this.userSessionStorage = this.token.getToken(); //Fixme

    if(!this.userSessionStorage){
      this.router.navigate(['auth/login']);
    }
    this.getModules();
  }


  getModules(){
    this.apiService.getModules(this.moduleRequirement).subscribe((modules: Modules[])=>{
      return  this.modules = modules;
    })
  }

  goToModule(e: number){
    const  filterId = this.modules.find((el: any) => el.module_id === e)
    console.log(filterId)
    const id = filterId?.module_id;
    this.router.navigate(['/quiz/quiz-type', id]);
  }
}
