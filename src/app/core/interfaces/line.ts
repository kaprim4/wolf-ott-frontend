
export interface ILine {
    id: number;
    username: string;
    password: string;
    owner: string;
    status: number;
    online: boolean;
    trial: boolean;
    active: number;
    connections: number;
    expiration: string;
    lastConnection: string;

    [key: string]: number | string | any | boolean;
}

