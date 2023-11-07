import {GasStation} from "./gas_station";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    role: string;
    gasStation: GasStation;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    enabled: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;

    [key: string]: number | string | GasStation | boolean;
}

export interface ISingleUser{
    data: IUser
}

export interface IDataUser{
    data: IUser[]
}

export interface ITokenUser{
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    gas_station_id?: number;
    gas_station_code_sap?: string;
    role?: string;
    exp?: number;
    iat?: number;
}
