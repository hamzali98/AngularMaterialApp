import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {

  BaseUrl: string = "http://localhost:3000/products";

  httpClient = inject(HttpClient);


  constructor() { }

}
