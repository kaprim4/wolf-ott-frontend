export interface VoucherType {
    id: number;
    libelle: string;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | number | boolean;
}

export interface IVoucher {
    id: 0,
    voucherTypes_id: number,
    date: string,
    num_bon: string,
    isActivated: boolean,
    isDeleted: boolean,
    createdAt: string,
    updatedAt: string,
}
