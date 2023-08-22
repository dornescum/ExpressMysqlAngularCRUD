import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(key: string): any {
    const item = sessionStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
