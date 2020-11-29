export class User {
    id: string;
    isAdmin: boolean;
    email: string;
    password: string;
    userName: string;
    token: string;
    group: string;
}

export class Member {
    id: number;
    isAdmin: boolean;
    userName: string;
}

export interface INewMember {
    userId: string;
    groupId: number;
}