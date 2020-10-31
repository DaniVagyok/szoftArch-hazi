import { Component } from '@angular/core';

import { User } from '../models';
import { AccountService } from '../services';

@Component({ 
    templateUrl: 'home.component.html' ,
    selector: 'home-component',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}