import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

import { User } from '../models/user';
import { Category, Product } from '../models/product';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application.json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 baseUrl = environment.baseUrl;
 private productsUrl= this.baseUrl + `/api/products`;

  constructor(private http:HttpClient, public dialog:MatDialog) { }

  addCategory(addCategoryName: string) {
    return this.http.post<any>(this.productsUrl, addCategoryName)
  }

  assignProduct(id:number, name: string){
    console.log(id, name)
  }

  takeBackProduct(id:number){
    console.log(id)
  }
  
  getProducts(){
    return this.http.get<any>(this.productsUrl)

    /*

    getUsers(): Observables<User[]> {
      return this.http.get<User[]>(this.url);
    }

    TODO: uncomment

    toggleIsAdmin(user: User):Observable<Any>{
      const userIdUrl = `${this.url}/${user.id}`;
      return this.http.put(userIdUrl, user, httpOptions);
    }

    TODO: uncomment

    deleteUser(user: User):Observable<User>{
      const userIdUrl = `${this.url}/${user.id}`;
      return this.http.delete<User>(userIdUrl, httpOptions);
    }
    */
  }

  createProduct(newProduct: Product) {
    
    
    //return this.post<PostResult>(`${environment.apiUrl}/api/course`, newCourse);
  }
  
}
