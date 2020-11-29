import { Component, OnInit, Input, Output } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() user: User;

  addMemberName: string;
  users: User[];
  groupInfo: {
    groupId: number,
    memberId: number,
    groupName: string,
    isAdminInGroup: boolean
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getGroup()
      .subscribe(
        res => {
          this.groupInfo = res;
        },
        err => console.log(err)
      );
      this.userService.getUsersInGroup(this.groupInfo.groupId)
        .subscribe(
          res => {
            this.users = res;
          },
          err => console.log(err)
        );
  }

  addMember() {
    this.userService.addMember(this.addMemberName, this.groupInfo.groupId)
    .subscribe(res => {
      this.users = res;
    });
  }

  onToggle(user) {
    user.isAdmin = !user.isAdmin;

    this.userService.toggleIsAdmin(user, this.groupInfo.groupId).subscribe(res => {
      user = res;
    });
  }
}
