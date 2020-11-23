import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData : any = {}

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.auth.registerUser(this.registerUserData)
    .subscribe( 
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/products'])
      },
      err => console.log(err)
    )
  }

}
