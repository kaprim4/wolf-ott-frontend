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

export interface VoucherHeader {
    id: number;
    gasStation: any;
    slipNumber: number;
    voucherDate: string;
    isDayOver: boolean;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | number | boolean | any;
}

export interface VoucherLine {
    id: number;
    voucherTemp: any;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | number | boolean | any;
}

export interface VoucherTemp {
    id: number;
    voucherType: any;
    voucherHeader: any;
    voucherNumber: string;
    voucherAmount: number;
    vehiculeNumber: string;
    barcode: string;
    poste_produit: number;
    gasStationOrigin: any;
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
    voucherType: any;
    voucherTypeIcon: string;
    sum: number;
    count: number;

    [key: string]: string | number | any;
}

export interface VoucherResponseHeader {
    gas_station_id: number;
    maxSlipNumber: number;
    nextSlipNumber: number;
}
