import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrlV2 = environment.apiUrlV2;
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  postProduct(url: string,id:any, payload: any) {
    console.log(`${this.baseUrl}${url}/${id}`, payload);
    return this.http.post(`${this.baseUrlV2}${url}/${id}`, payload);
  }

  getAllProducts(url: string, token: string) {
    const headers = { 'X-Access-Token': token };

    return this.http.get(`${this.baseUrlV2}${url}`, {headers});
  }
}
