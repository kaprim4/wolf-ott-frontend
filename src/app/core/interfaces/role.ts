export interface Role {
    id: number;
    libelle: string;
    alias: string;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: number | string | boolean;
}
