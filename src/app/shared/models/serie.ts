export interface ISerie {
    id: number
}

export interface SerieList extends ISerie {
    title: string,
    categories: number[],
    cover: string,
    genre: string,
    year: number,
    rating: number
}