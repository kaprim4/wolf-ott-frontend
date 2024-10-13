export interface IBouquet {
    id: number
}

export interface BouquetList extends IBouquet {
    bouquetName: string,
    bouquetOrder: number
}

export interface BouquetDetail extends IBouquet {
    bouquetName: string,
    bouquetChannels: string,
    bouquetMovies: string,
    bouquetRadios: string,
    bouquetSeries: string,
    bouquetOrder: number
}