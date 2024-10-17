
export interface IStream {
    id: number;
    streamname: string;
}

export interface StreamList{
    id: number;
    streamname: string;
    email: string;
    credits: number;
    dateRegistered: string;
    notes: string;
    ip: string;
    lastLogin: string;
    status: boolean;

    [key: string]: number | string | any | boolean;
}
