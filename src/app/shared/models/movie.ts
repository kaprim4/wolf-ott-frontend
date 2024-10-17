
export interface IMovie {
    id: number;
    moviename: string;
}

export interface MovieList{
    id: number;
    moviename: string;
    email: string;
    credits: number;
    dateRegistered: string;
    notes: string;
    ip: string;
    lastLogin: string;
    status: boolean;

    [key: string]: number | string | any | boolean;
}
