import {Company} from "./company";
import {Supervisor} from "./supervisor";
import {City} from "./city";

export interface GasStation {
    id: number;
    company: any;
    supervisor: any;
    city: any;
    code_sap: string;
    libelle: string;
    zip_code: string;
    address: string;
    latitude: string;
    longitude: string;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: string | any | number | boolean;
}
