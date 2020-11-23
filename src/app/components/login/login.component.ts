import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData: any ={}

  constructor(private auth:AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.auth.loginUser(this.loginUserData)
    .subscribe(
      res =>{ 
        console.log(res),      
        localStorage.setItem('token', res.token)
        this.router.navigate(['/products'])
      },
      err => console.log(err)
      )
  }

}

