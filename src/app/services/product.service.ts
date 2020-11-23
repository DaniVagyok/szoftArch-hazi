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

 /*
  TODO url beállítása
  url: string = '';
  */

  private productsUrl="http://localhost:3000/api/products"

  constructor(private http:HttpClient, public dialog:MatDialog) { }

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
