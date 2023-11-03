// types
import { IAlbum } from "ngx-lightbox";

export interface GalleryItem {
    id?: number;
    image?: IAlbum;
    title?: string;
    category?: string[];
}