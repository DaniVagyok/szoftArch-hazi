import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Category } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  baseUrl = '';//environment.baseUrl;
  private setsUrl = this.baseUrl + `/api/sets`;

  constructor(private http: HttpClient) { }

  addSet(name:string){
    return this.http.post<any>(this.setsUrl, name)
  }

  assignSet(id: number, name: string){
    return this.http.post<any>(this.setsUrl, {id, name})
  }

  takeBackSet(id:number){
    return this.http.post<any>(this.setsUrl, id)
  }

  addProductToSet(setid:number, selectedProduct:string){
    return this.http.post<any>(this.setsUrl, {setid, selectedProduct})
  }

  getSets() {
    return [
      {
        id: 1,
        name: 'Moldvai csángó',
        products: [
          {
            id: 2,
            hasOwner: true,
            ownerId: 2,
            name: 'Fekete gatyó',
            category: Category.Pants,
            set: 'Moldvai csángó',
            imgsrc: "https://www.neptanckellek.hu/img/42348/catpic_489614/153x153/489614.webp?time=1545404367"
          },
          {
            id: 4,
            hasOwner: true,
            ownerId: 0,
            name: 'Thornmail',
            category: Category.Vest,
            set: 'Moldvai csángó',
            imgsrc: "https://static.wikia.nocookie.net/leagueoflegends/images/6/68/Thornmail_item_old.png/revision/latest/top-crop/width/450/height/450?cb=20180514001502"
          },
        ],
        hasOwner: false,
        ownerId: null,
      },
      {
        id: 2,
        name: 'Palóc folklór szett',
        products: [
          {
            id: 5,
            hasOwner: true,
            ownerId: 1,
            name: 'Tolvajsurranó',
            category: Category.Boots,
            set: 'Palóc folklór szett',
            imgsrc: "https://preview.redd.it/ay4p2xmp50b11.jpg?width=320&format=pjpg&auto=webp&s=9a39b443556a792f8bbcff02844e5d9b270159bd"
          },
          {
            id: 6,
            hasOwner: true,
            ownerId: 1,
            name: 'Meg Lépő',
            category: Category.Boots,
            set: 'Palóc folklór szett',
            imgsrc: "https://www.neptanckellek.hu/img/42348/1401001/210x210/1401001.webp?time=1603984483"
          }
        ],
        hasOwner: true,
        ownerId: 1,
      },
    ]
  }
}
