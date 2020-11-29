import { Component, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend-teszt';
  groupInfo: {
    groupId: number,
    groupName: string,
    memberId: number,
    isAdminInGroup: boolean
  };

  constructor(public authService: AuthService,
    public userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.getGroup()
      .subscribe(
        res => {
          this.groupInfo = res;
        },
        err => console.log(err)
      );
  }
}
