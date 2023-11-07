export class AuthResponse {
    token?: string;
}

export class TokenDecoded{
    id?: number;
    role?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    gas_station_id?: number;
    gas_station_code_sap?: string;
    exp?: number;
    iat?: number;
}

export class AuthUser {
    id?: number;
    role?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    email?: string;
    gas_station_id?: number;
    gas_station_code_sap?: string;
    token?: string;
    avatar?: string;
}
