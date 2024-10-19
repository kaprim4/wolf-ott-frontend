
export interface IStation {
    id: number;
    stationname: string;
}

export interface StationList extends IStation {
    id: number;
    name: string;
    categories: number[],

    [key: string]: number | string | any | boolean;
}
