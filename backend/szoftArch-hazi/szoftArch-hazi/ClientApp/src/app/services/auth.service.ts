import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = '';//environment.baseUrl;
  
  private registerUrl=this.baseUrl + `/api/register`;
  private loginUrl=this.baseUrl + `/api/login`;
  private groupUrl=this.baseUrl + `/api/group`;


  constructor(private http: HttpClient,
              private router: Router) { }

  registerUser(user){
    return this.http.post<any>(this.registerUrl, user)
  }

  loginUser(user){
    return this.http.post<any>(this.loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getGroup(){
    
    return true
    //return this.http.get<any>(this.groupUrl)
  }

  createGroup() {
    
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
