import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  groupRegisterData : any = {}

  constructor(private auth:AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  createGroup(){
    this.auth.createGroup(this.groupRegisterData)
    .subscribe(
      res =>{      
        this.router.navigate(['/products'])
      },
      err => console.log(err)
      )
  }

}
