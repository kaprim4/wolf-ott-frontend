
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    role: any;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;

    [key: string]: number | string | any | boolean;
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


export interface UserData {
    id: number;
    username: string;
    owner: string;
    ip: string;
    status: string;
    credits: number;
    nb_lines: number;
    last_login: string;
}


export interface UserEssential {
    id: number; // User ID
    username: string; // User's username
    email: string; // User's email address
    ip: string; // IP address of the user
    credits: number; // Credits associated with the user
    notes: string | null; // Optional notes, can be null
    status: boolean; // User's status (active or inactive)
    lastLogin: string; // Timestamp of the last login in ISO 8601 format
    dateRegistered: string; // Timestamp of the date registered in ISO 8601 format
}

export interface UserDetails {
    id: number;
    username: string;
    password: string;
    email: string;
    ip: string;
    date_registered: number;
    last_login: number;
    member_group_id: number;
    credits: number;
    notes: string;
    status: boolean;
    reseller_dns: string;
    owner_id: number;
    override_packages: string;
    hue: string;
    theme: number;
    timezone: string;
    api_key: string;
    group_group_id: number;
}
