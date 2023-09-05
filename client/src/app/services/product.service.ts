import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient, HttpParams} from '@angular/common/http';
// import {Product} from "../components/models/user";
import {Observable} from "rxjs";
import {Brands, Categories, Product} from "../components/models/products";

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

  updateProduct(url: string, uid:any, payload: any, pid: any) {
    // console.log('update service pid', pid)
    // console.log('update service uid', uid)
    // console.log(`'update service ',${this.baseUrl}${url}/${pid}`, payload);
    return this.http.put(`${this.baseUrlV2}${url}/${pid}`, payload);
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

  getProductId(url: string, token: string, uid: any, pid: any): Observable<Product> {
    const headers = { 'X-Access-Token': token };
    return this.http.get<Product>(`${this.baseUrlV2}${url}/${uid}/${pid}`, { headers });
  }

  getCategories( url: string ): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.baseUrlV2}${url}`);
  }

  getBrands( url: string): Observable<Brands[]> {
    return this.http.get<Brands[]>(`${this.baseUrlV2}${url}`);
  }


  // api products no security but rate limiter
  getApiProducts(url: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}${url}/`);
  }

  deleteProduct(url: string, uid:any, pid: any) {
    // console.log('update service pid', pid)
    // console.log('update service uid', uid)
    // console.log(`'update service ',${this.baseUrl}${url}/${pid}`, payload);
    return this.http.delete(`${this.baseUrlV2}${url}/${uid}/${pid}`);
  }

  // getSearch(url: string, token: string, uid: any, payload: any): Observable<Product[]> {
  //   console.log('u', url);
  //   console.log('t', token);
  //   console.log('id', uid);
  //   console.log('p', payload);
  //   const headers = { 'X-Access-Token': token };
  //   const params = new HttpParams({ fromObject: payload });
  //   console.log('params: ', params.toString());
  //   return this.http.get<Product[]>(`${this.baseUrlV2}${url}/${uid}`, { headers, params });
  // }


  getSearch(url: string, token: string, uid: any, payload: any){
    const params = new HttpParams().set('q', payload);
    const headers = { 'X-Access-Token': token };
    return  this.http.get<Product[]>(`${this.baseUrlV2}${url}/${uid}`, { headers, params })
  }

}
