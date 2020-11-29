import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application.json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "";//environment.baseUrl;
  private usersUrl = this.baseUrl + `/api/users`;
  private groupUrl = this.baseUrl + `/api/group`;

  constructor(private http: HttpClient) { }

  getGroup() {
    return this.http.get<any>(this.groupUrl);
  }

  addMember(addMemberName, groupId): Observable<any> {
    return this.http.put(`${this.usersUrl}/${groupId}/member`, addMemberName);
  }

  toggleIsAdmin(user: User, groupId): Observable<any> {
    return this.http.put(`${this.usersUrl}/${groupId}/admin`, user);
  }

  getUsersInGroup(groupId): Observable<any> {
    return this.http.get<any>(`${this.groupUrl}/${groupId}/user/group`);
  }

  getUsers() {
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
    ];

    /*
    TODO: swap getUsers(), NEED TEAM IN THE REQUEST
    */
  }
}
