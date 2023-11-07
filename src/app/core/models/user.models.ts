import {GasStation} from "./gas_station.models";

export interface User {
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
