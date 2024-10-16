import { BouquetDetail } from "../models/bouquet";

export class BouquetFactory {
  static initBouquetDetail(): BouquetDetail {
    return {
        id: 0,
        bouquetName: '',
        bouquetChannels: '',
        bouquetMovies: '',
        bouquetRadios: '',
        bouquetSeries: '',
        bouquetOrder: 0
    }
  }
}
