// import { CanActivateFn } from '@angular/router';
//
// export const authGuardGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService} from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private _route: Router, private token: TokenService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const currentUser = this.token.getUser();
    // console.log('currentUser authGuard', currentUser);
    if (currentUser) {
      return true;
    }
    this._route.navigate(['/auth/login']);
    return false;
  }
}
