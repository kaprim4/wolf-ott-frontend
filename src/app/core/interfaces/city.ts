import {Region} from "./region";
export interface City {
    id: number;
    region: Region;
    libelle: string;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}
