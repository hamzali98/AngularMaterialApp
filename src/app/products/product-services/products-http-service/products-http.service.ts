import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { productInterface } from '@app/products/interface/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {

  BaseUrl: string = "http://localhost:3000/products";

  httpClient = inject(HttpClient);

  constructor() { }

  getData(){
    return this.httpClient.get<any>(this.BaseUrl, {observe: 'response' as const});
  }

  addProduct(payload : Object){
    return this.httpClient.post<any>(this.BaseUrl, payload);
  }

  editProduct(pid : string, payload: Object){
    return this.httpClient.put<any>(`${this.BaseUrl}/${pid}`, payload);
  }

  deleteproduct(pid: string){
    return this.httpClient.delete<any>(`${this.BaseUrl}/${pid}`);
  }

}
