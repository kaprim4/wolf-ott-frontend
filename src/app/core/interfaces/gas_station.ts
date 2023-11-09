import {Company} from "./company";
import {Supervisor} from "./supervisor";
import {City} from "./city";

export interface GasStation {
    id: number;
    company: Company | null;
    supervisor: Supervisor | null;
    city: City;
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

    [key: string]: string | Company | Supervisor | City | number | boolean | null;
}
