import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Modules} from '../components/models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getTypeRequest(url: string) {
    return this.http.get(`${this.baseUrl}${url}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  postTypeRequest(url: string, payload: any, options?: any) {
    return this.http.post(`${this.baseUrl}${url}`, payload, options).pipe(
      map((res) => {
        return res;
      })
    );
  }

  putTypeRequest(url: string, payload: any) {
    return this.http.put(`${this.baseUrl}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getModules(url: string) {
    return this.http.get(`${this.baseUrl}${url}`).pipe(
      map((res) => {
        // console.log('module req', res);
        return res as Modules[];
      })
    );
  }
  getModuleById(url: string, moduleId: number) {
    return this.http.get(`${this.baseUrl}${url}/${moduleId}`);
  }

    // nu este folosit pt a stoca id intrebarilor
  postQuestionsId(url: string, id: any, payload: any) {
    return this.http.post(`${this.baseUrl}${url}/${id}`, payload).pipe(
        map((res) => {

          return res;
        })
    );
  }

  // module question : not used for now
    postQuestionsIdResponse(url: string, id: any, payload: any) {
        return this.http.post(`${this.baseUrl}${url}/${id}`, payload).pipe(
            map((res) => {
                return res;
            })
        );
    }

    getQuestionById(url: string, moduleId: string, questionId: string) {
        return this.http.get(`${this.baseUrl}${url}/${moduleId}/${questionId}`);
    }
}
