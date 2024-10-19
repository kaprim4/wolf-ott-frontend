
export interface IMovie {
    id: number;
    moviename: string;
}

export interface MovieList extends IMovie {
    id: number;
    name: string;
    categories: number[];

    [key: string]: number | string | any | boolean;
}
