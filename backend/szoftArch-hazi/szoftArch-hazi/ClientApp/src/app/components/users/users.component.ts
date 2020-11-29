import { Component, OnInit, Input, Output } from '@angular/core';

import { INewMember, User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() user: User;

  newMember: INewMember;
  users: User[];
  usersNotInGroup: User[];
  selectedMember: User;
  groupInfo: {
    id: number,
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
          this.userService.getUsersInGroup(this.groupInfo.id)
            .subscribe(
              res => {
                this.users = res;
              },
              err => console.log(err)
            );
          this.userService.getUsersNotInGroup(this.groupInfo.id)
            .subscribe(
              res => {
                this.usersNotInGroup = res;
              }
            )

        },
        err => console.log(err)
      );
  }

  addMember() {
    console.log(this.selectedMember.id);
    this.userService.addMember({groupId: this.groupInfo.id, userId:this.selectedMember.id}, this.groupInfo.id)
      .subscribe(() => {
        this.userService.getUsersInGroup(this.groupInfo.id)
          .subscribe(
            res => {
              this.users = res;
            },
            err => console.log(err)
          );
      });
  }

  onToggle(user) {
    user.isAdmin = !user.isAdmin;

    this.userService.toggleIsAdmin(user, this.groupInfo.id).subscribe(res => {
      user = res;
    });
  }

  selectChangeHandler(event:any){
    this.selectedMember = event.target.value;
  }
}
