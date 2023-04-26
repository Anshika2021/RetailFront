import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private httpClient:HttpClient) { }

  //for calling Api
  getProduct()
  {
    return this.httpClient.get<any>("https://fakestoreapi.com/products").
    pipe(map((res:any)=>{
      return res;
    }))
  }
}
