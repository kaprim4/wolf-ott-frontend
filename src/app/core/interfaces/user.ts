import {GasStation} from "./gas_station";
import {Role} from "./role";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    role: Role | null;
    gasStation: GasStation | null;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    [key: string]: number | string | GasStation | Role | null | boolean;
}

export interface IUserSubmit {
    id: any,
    gasStation: {
        id: number,
    },
    role: {
        id: number,
    },
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    isActivated: boolean;
}

export interface ITokenUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    gas_station_id: number;
    gas_station_code_sap: string;
    role_id: number;
    role_name: string;
    exp: number;
    iat: number;
}
