import {Region} from "./region";

export interface City {
    id: number;
    region: Region | null;
    libelle: string;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | Region | number | boolean | null;
}
