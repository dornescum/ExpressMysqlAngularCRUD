import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../components/models/user";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  error = '';
  loading = false;
  connectionErr='';
  uid!: User | null;
  user!: User;
  userId!: number | undefined;
  userSessionStorage!: string;

  constructor(private router: Router, private auth: AuthService,  private token: TokenService,) {}

  ngOnInit() {
    this.userSessionStorage = this.token.getToken() as string;
    this.user = this.auth.getUser();
    this.uid = this.token.getUser();
    this.userId = this.uid?.id;

    console.log('ss', this.userSessionStorage);
    console.log('user', this.user);
    console.log('user id', this.userId);
    console.log('uid : ', this.uid);
    this.getUserProfile();
  }

  getUserProfile(){

  }
}
