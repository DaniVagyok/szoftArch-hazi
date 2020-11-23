import { Component, OnInit, Input, Output } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() user: User;

  users: User[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();

    /*
    TODO: Swap this:
    this.users = this.userService.getUsers();

    To this:

    this.userService.getUsers().subscribe(users => {
       this.users = users;
     })
    */
  }

  onToggle(user){
    // toggle in UI
    user.isAdmin = !user.isAdmin;

    //toggle on server

    /*
    TODO: uncomment

    this.userService.toggleIsAdmin(user).subscribe(user =>{

    })

    */
  }


  onDelete(user){
    //delete from UI
    this.users = this.users.filter(u => u.id !== user.id)

    /*
    TODO: uncomment

    this.userService.deleteUser(user).subscribe();
    */
  }

}
