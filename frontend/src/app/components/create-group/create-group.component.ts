import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  groupRegisterData : any = {}

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  createGroup(){
    this.auth.createGroup();
  }

}
