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
    // console.log(this.userSubject);
    // console.log(this.userSubject.value);
    return this.userSubject.value;
  }

  login(credentials: any): Observable<any> {
    console.log('auth service login', credentials,  { withCredentials: true })
    return this.api
      // .postTypeRequest('auth/login', {
      .postTypeRequest('login-user', {
        email: credentials.email,
        password: credentials.password,
      }, { withCredentials: true })
      .pipe(
        map((res: any) => {
          console.log('login map ', res)
          const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${this.token}`)
            .set('X-Access-Token',`${this.token}`);
          const user = {
            email: credentials.email,
            token: res.token,
            headers: headers
          };
          this.token.setToken(res.token);
          this.token.setUser(res.data[0]);
          // if (this.token) {
          //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
          //   // return this.http.get('/api/protected', { headers });
          // }
          // console.log('FROM login auth', res);
          this.userSubject.next(user);
          return user;
        })
      );
  }

  register(user: User): Observable<any> {
    // console.log('user from register auth service', user);
    console.log('user role', user);
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

  // login(credentials: { email: string, password: string }) {
  //   return this.http.post('/api/login', credentials);
  // }

  // getProtectedData() {
  //   const token = localStorage.getItem('token'); // Retrieve token from storage
  //   if (token) {
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //     return this.http.get('/api/protected', { headers });
  //   }
  // }
}
