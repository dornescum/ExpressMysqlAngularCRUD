import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';

  constructor() {}

  public getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getUser(): any {
    const userJson = sessionStorage.getItem(this.USER_KEY);
    if (userJson !== null) {
      return JSON.parse(userJson);
    }
    return null;
  }

  setUser(user: any): void {
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clearStorage(): void {
    sessionStorage.clear();
  }

  getCookie(name: string): string | null {
    console.log(document.cookie);

    const value = `; ${document.cookie}`;
    console.log('value', value)
    const parts = value.split(`; ${name}=`);


    if (parts.length === 2 || (parts.length > 2 && parts[0] === "")) {
      return parts.pop()?.split(';').shift() || null;
    }

    if (value.startsWith(`${name}=`)) {
      return value.split(';')[0].split('=')[1] || null;
    }

    console.log('value after ', value)
    return null;
  }

}
