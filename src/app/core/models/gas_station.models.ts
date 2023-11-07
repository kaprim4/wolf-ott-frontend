import {Company} from "./company.models";
import {Supervisor} from "./supervisor.models";
import {City} from "./city.models";

export interface GasStation {
    id: number;
    company: Company;
    supervisor: Supervisor;
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

    [key: string]: string | Company | Supervisor | City | number | boolean;
}
