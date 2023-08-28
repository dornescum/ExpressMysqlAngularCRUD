import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Product} from "../components/models/user";
import {Observable} from "rxjs";

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

  // getAllProducts(url: string, token: string):Observable<Product[]> {
  //   const headers = { 'X-Access-Token': token };
  //
  //   return this.http.get(`${this.baseUrlV2}${url}`, {headers});
  // }

  getAllProducts(url: string, token: string, uid: any): Observable<Product[]> {
    const headers = { 'X-Access-Token': token };
    return this.http.get<Product[]>(`${this.baseUrlV2}${url}/${uid}`, { headers });
  }

  getProductId(url: string, token: string, uid: any, pid: any): Observable<Product[]> {
    const headers = { 'X-Access-Token': token };
    return this.http.get<Product[]>(`${this.baseUrlV2}${url}/${uid}/${pid}`, { headers });
  }

}
