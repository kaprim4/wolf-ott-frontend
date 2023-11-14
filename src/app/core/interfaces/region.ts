export interface Region {
    id: number;
    libelle: string;
    code: string;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: number | string | boolean;
}
