
export interface IStation {
    id: number;
    stationname: string;
}

export interface StationList{
    id: number;
    stationname: string;
    email: string;
    credits: number;
    dateRegistered: string;
    notes: string;
    ip: string;
    lastLogin: string;
    status: boolean;

    [key: string]: number | string | any | boolean;
}
