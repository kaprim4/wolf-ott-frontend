export interface Supervisor {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: number | string | boolean;
}
