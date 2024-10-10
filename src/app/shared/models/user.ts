export interface IUser {
    id: number;
    username: string;
}

export interface UserList extends IUser {
    email: string;
    credits: number;
    dateRegistered: string;
    notes: string;
    ip: string;
    lastLogin: string;
    status: boolean;

    [key: string]: number | string | any | boolean;
}


