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

 baseUrl ='';// environment.baseUrl;
 private productsUrl= this.baseUrl + `/api/inventory`;

  constructor(private http:HttpClient, public dialog:MatDialog) { }

  addCategory(addCategoryName: string) { // POST: "{groupId}/category", {name}
    return this.http.post<any>(this.productsUrl, addCategoryName)
  }

  assignProduct(id:number, name: string){ // POST: "productUrl + /rent/set", {id, memberId}
    console.log(id, name)
  }

  takeBackProduct(id:number){ // POST: "productUrl + /revoke/set", itemId
    console.log(id)
  }
  
//sajat productok // GET: "productUrl + /{memberId}/rent/item", term
                  // GET: "productUrl + /{groupId}/item", term
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
//POST: "productUrl+  /item", {} <- ennek a product modellnek a tartalmát még csiszolom majd
/*form data:
string name
number? categoryId
 File file*/
  createProduct(newProduct: Product) {
    
    
    //return this.post<PostResult>(`${environment.apiUrl}/api/course`, newCourse);
  }
  
}
