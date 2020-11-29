import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../models/user';
import { Category, INewProductModel, Product } from '../models/product';
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

  baseUrl = "";//environment.baseUrl;
  private productsUrl = this.baseUrl + `/api/products`;
  private groupUrl = this.baseUrl + `/api/group`;
  private inventoryUrl = this.baseUrl + `/api/inventory`;



  constructor(private http: HttpClient, public dialog: MatDialog) { }

  addCategory(category, groupId) {
    return this.http.post<any>(`${this.groupUrl}/${groupId}/category`, category);
  }

  addProduct(groupId, item: INewProductModel): Observable<void> {
    const formData = new FormData();
    const itemDto = {
      ...item
    };
    for (const key in itemDto) {
      if (key) {
        formData.append(key, itemDto[key]);
      }
    }
    return this.http.post<any>(`${this.inventoryUrl}/${groupId}/item`, formData);
  }

  getCategories(groupId) {
    return this.http.get<any>(`${this.groupUrl}/${groupId}/category`)
  }

  assignProduct(item) {
    return this.http.post<any>(`${this.inventoryUrl}/rent/item`, item)
  }

  takeBackProduct(id) {
    return this.http.delete<any>(`${this.inventoryUrl}/revoke/item/${id}`)
  }

  getProducts(groupId: number, str: string) {
    const params = new HttpParams()
      .set('term', str)
    return this.http.get<any>(`${this.inventoryUrl}/${groupId}/item`, { params })
  }

  assignProductToSet(setId, item) {
    return this.http.post<any>(`${this.inventoryUrl}/${setId}/item`, item)
  }

  getMyProducts(myId: number, str: string) {
    const params = new HttpParams()
      .set('term', str)
    return this.http.get<any>(`${this.inventoryUrl}/${myId}/rent/item/`, { params })
  }


}
