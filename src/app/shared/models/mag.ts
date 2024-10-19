export interface IMag {
    id: number
}

export interface MagList extends IMag {
    mac: string;
    device: string;
    owner: string;
    status: boolean;
    online: boolean;
    trial: boolean;
    expiration: Date;
    lang: string;
    local: string;
}