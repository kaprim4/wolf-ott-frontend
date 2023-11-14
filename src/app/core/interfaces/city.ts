
export interface City {
    id: number;
    region: any;
    libelle: string;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | any | number | boolean;
}
