import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private api: ApiService, private token: TokenService, private router: Router) {
    this.userSubject = new BehaviorSubject<any>(this.token.getUser());
    this.user = this.userSubject.asObservable();
  }

  getUser() {
    // console.log(this.userSubject);
    // console.log(this.userSubject.value);
    return this.userSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this.api
      .postTypeRequest('auth/login', {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(
        map((res: any) => {
          const user = {
            email: credentials.email,
            token: res.token,
          };
          this.token.setToken(res.token);
          this.token.setUser(res.data[0]);
          // console.log('FROM login auth', res);
          this.userSubject.next(user);
          return user;
        })
      );
  }

  register(user: any): Observable<any> {
    console.log('user from register auth service', user);
    // console.log('user role', user);
    return this.api.postTypeRequest('auth/register', {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      card_number: user.card_number,
      card_name: user.card_name,
      card_expire: user.card_expire,
      csv: user.csv,
      role: user.role
    });
  }

  logout() {
    this.token.clearStorage();
    this.router.navigate(['/login']);
    this.userSubject.next(null);
  }
}
