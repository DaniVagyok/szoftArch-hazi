export class User {
    id: string;
    role: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    group: string;
}

export enum Role {
    User = 'User',
    Admin = 'Admin'
}