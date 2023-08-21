import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  user!: {};
  userSessionStorage: any;
  constructor(private authService: AuthService, private token: TokenService, private router: Router) {
  }
  ngOnInit(){
    this.user = this.authService.getUser();
    // console.log('1',this.user)
    this.userSessionStorage = this.token.getToken(); //Fixme
    console.log('w token ', this.userSessionStorage)

    if(!this.userSessionStorage){
      this.router.navigate(['auth/login']);
    }
  }
}
