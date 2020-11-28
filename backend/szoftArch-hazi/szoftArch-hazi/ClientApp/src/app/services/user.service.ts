import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application.json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = '';//environment.baseUrl;
  private usersUrl= this.baseUrl + `/api/users`;

  constructor(private http:HttpClient) { }

  getUsers(){
    return [
      {
        id: 1,
        isAdmin: true,
        email: 'user1@gmail.com',
        password: 'asd',
        firstName: 'jack',
        lastName: 'bauer',
        token: 'token',
        group: 'csopi1',
      },
      {
        id: 2,
        isAdmin: false,
        email: 'admin1@gmail.com',
        password: 'asd',
        firstName: 'beke',
        lastName: 'rugos',
        token: 'token',
        group: 'csopi1',
      }
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
