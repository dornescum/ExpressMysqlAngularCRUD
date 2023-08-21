import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";
import {ApiService} from '../../services/api.service';
import {environment} from '../../../enviroments/enviroment';
import {Modules, User} from '../../components/models/user';
import {style} from '@angular/animations';
// import * as stream from 'stream';



const url = environment.apiUrl

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
    // console.log('1',this.user)
    this.userSessionStorage = this.token.getToken(); //Fixme
    // console.log('w token ', this.userSessionStorage)

    if(!this.userSessionStorage){
      this.router.navigate(['auth/login']);
    }
    // console.log('1',  this.modules)
    this.getModules();
    // console.log('2',  this.modules)

  }


  getModules(){
    this.apiService.getModules(this.moduleRequirement).subscribe((modules: Modules[])=>{
      // console.log('2',  modules)
      return  this.modules = modules;
    })
  }

  goToModule(e: number){
    console.log('modules', this.modules)
    const  filterId = this.modules.find((el: any) => el.module_id === e)
    // this.apiService
    console.log(filterId)
    const id = filterId?.module_id;
    console.log('id : ', id)
    this.router.navigate(['/quiz-type', id]);
  }

  // protected readonly style = style;
}
