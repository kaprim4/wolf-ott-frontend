
export interface IStream {
    id: number;
    streamname: string;
}

export interface StreamList extends IStream {
    id: number;
    name: string;
    categories: number[],

    [key: string]: number | string | any | boolean;
}
