export interface IUser {
    id: number;
    username: string;
}

export interface UserList extends IUser {
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
    password?: string,
    email?: string;
    ip?: string;
    credits?: number;
    notes?: string | null;
    status?: boolean;
    resellerDns?: string;
    ownerId?: number;
    overridePackages?: string; // Assuming this is a string representation of an array
    hue?: string;
    theme?: number;
    timezone?: string;
    apiKey?: string;
    lastLogin?: string; // Consider using Date if you're parsing this into a Date object
    dateRegistered?: string; // Same as above
}

