import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Category } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  /*
  TODO url beállítása
  url: string = '';
  */

  constructor(private http: HttpClient) { }

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
            id: 3,
            hasOwner: false,
            ownerId: 2,
            name: 'Cilinder',
            category: Category.Hat,
            set: 'Moldvai csángó',
            imgsrc: "https://www.wildwest.hu/upload/pics/products/img/_crop/_1000w_1000h_3598.jpg"
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
        hasOwner: true,
        ownerId: 1,
      },
      {
        id: 2,
        name: 'Palóc folklór szett',
        products: [
          {
            id: 1,
            hasOwner: true,
            ownerId: 1,
            name: 'Fehér ing',
            category: Category.Shirt,
            set: 'Palóc folklór szett',
            imgsrc: "https://www.neptanckellek.hu/img/42348/catpic_122501/153x153/122501.webp?time=1545404307"
          },
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
            ownerId: 0,
            name: 'Meg Lépő',
            category: Category.Boots,
            set: 'Palóc folklór szett',
            imgsrc: "https://www.neptanckellek.hu/img/42348/1401001/210x210/1401001.webp?time=1603984483"
          }
        ],
        hasOwner: true,
        ownerId: 2,
      },
    ]

    /*
    TODO: swap getUsers(), NEED TEAM IN THE REQUEST
 
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
}
