import { Component } from '@angular/core';

import { User } from '../models';

@Component({ 
    templateUrl: 'home.component.html' ,
    selector: 'home-component',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    user: User;

    constructor() {
    }
}