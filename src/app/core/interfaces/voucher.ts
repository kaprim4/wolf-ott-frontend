export interface VoucherType {
    id: number;
    libelle: string;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | number | boolean;
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
