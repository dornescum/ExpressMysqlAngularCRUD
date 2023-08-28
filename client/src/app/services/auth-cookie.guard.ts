import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from "./token.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class AuthCookieGuard implements CanActivate {
  constructor(private _route: Router, private token: TokenService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const currentUser = this.token.getCookie('jwtToken');
    // console.log('currentUser authCookie ', currentUser);
    if (currentUser) {
      return true;
    }
    this._route.navigate(['/auth/login']);
    return false;
  }
}
