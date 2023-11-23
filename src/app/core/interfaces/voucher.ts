export interface VoucherType {
    id: number;
    libelle: string;
    file: any;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | number | boolean | any;
}

export interface VoucherTemp {
    id: number;
    voucherType: any;
    voucherNumber: string;
    slipNumber: string;
    barcode: string;
    vehiculeNumber: string;
    voucherDate: string;
    gasStation: any;
    gasStationOrigin: any;
    poste_produit: number;
    voucherAmount: number;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | number | boolean | any;
}

export interface VoucherCustomer {
    id: number;
    codeSap: string;
    libelle: string;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | number | boolean;
}

export interface VoucherControl {
    id: number;
    voucherType: any;
    voucherCustomer: any;
    voucherNumber: string;
    voucherAmount: number;
    newlyAdded: boolean;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | number | boolean | any;
}

export interface VoucherTypeSum {
    gasStation: any;
    voucherType: any;
    sum: number;
    count: number;

    [key: string]: string | number | any;
}
