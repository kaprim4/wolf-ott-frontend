export interface IEnigma {
    id: number
}

export interface EnigmaList extends IEnigma {
    mac: string;
    ip: string;
    owner: string;
    status: boolean;
    online: boolean;
    trial: boolean;
    expiration: Date;
}

