
export interface IUser {
    readonly id: number;
    username: string;
}


export interface ITokenUser {
    "exp": number;
    "iat": number;
    "role_access": role_access | any,
    "role": string | any,
    "scope": string;
    "sid": string;
    "email_verified": boolean,
    "name": string;
    "preferred_username": string;
    "given_name": string;
    "family_name": string;
    "email": string;
}

export interface role_access {
    "roles": string[];
}

export interface UserList{
    id: number;
    username: string;
    email: string;
    credits: number;
    dateRegistered: string;
    notes: string;
    ip: string;
    lastLogin: string;
    status: boolean;

    [key: string]: number | string | any | boolean;
}

export interface UserDetail extends IUser {
    id: number;
    username: string;
    password?: string,
    email?: string;
    ip?: string;
    credits?: number;
    notes?: string | null;
    status?: boolean;
    resellerDns?: string;
    ownerId?: number;
    groupId?: number;
    overridePackages?: string; // Assuming this is a string representation of an array
    hue?: string;
    theme?: number;
    timezone?: string;
    apiKey?: string;
    lastLogin?: string; // Consider using Date if you're parsing this into a Date object
    dateRegistered?: string; // Same as above
}

export interface IUserThemeOptions {
    id: number;
    userId: number;
    theme: string;
    activeTheme: string;
    language: string;
}

export interface IUserThemeOptionsRequest {
    userId: number;
    theme: string;
    activeTheme: string;
    language: string;
}
