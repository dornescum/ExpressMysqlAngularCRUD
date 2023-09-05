import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import {Router} from '@angular/router';
import {User} from "../components/models/user";
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private api: ApiService, private token: TokenService, private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(this.token.getUser());
    this.user = this.userSubject.asObservable();
  }

  getUser() {
    return this.userSubject.value;
  }

  login(credentials: {email: string; password: string}): Observable<any> {
    return this.api
      .postTypeRequest('login-user', {
        email: credentials.email,
        password: credentials.password,
      }, { withCredentials: true })
      .pipe(
        map((res: any) => {
          const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${res.token}`)
            .set('X-Access-Token',`${res.token}`);
          const user = {
            email: credentials.email,
            token: res.token,
            headers: headers
          };
          this.token.setToken(res.token);
          this.token.setUser(res.data[0]);
          this.userSubject.next(user);
          return user;
        })
      );
  }

  register(user: User): Observable<any> {
    return this.api.postTypeRequest('register', {
      email: user.email,
      password: user.password,
      age: user.age,
      nickname: user.nickname
    });
  }

  logout() {
    this.token.clearStorage();
    this.router.navigate(['/login']);
    this.userSubject.next(null);
  }
}
