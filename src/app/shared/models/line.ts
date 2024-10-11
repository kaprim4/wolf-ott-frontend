export interface ILine {
    id: number
}

export interface LineList extends ILine {
    username: string,
    memberId: number,
    password: string,
    owner: string,
    status: string,
    online: string,
    trial: boolean,
    active: number,
    connections: number,
    expiration: Date,
    lastConnection: Date
}

export interface LineDetail extends ILine {
    memberId: number;
    username: string;
    password: string;
    lastIp: string;
    expDate: number; // Consider converting to Date in your application logic
    adminEnabled: boolean;
    enabled: boolean;
    adminNotes: string | null;
    resellerNotes: string | null;
    bouquet: string; // Consider parsing this if needed
    allowedOutputs: string; // Consider parsing this if needed
    maxConnections: number;
    isRestreamer: boolean;
    isTrial: boolean;
    isMag: boolean;
    isE2: boolean;
    isStalker: boolean;
    isIsplock: boolean;
    allowedIps: string; // Consider parsing this if needed
    allowedUa: string; // Consider parsing this if needed
    createdAt: number; // Consider converting to Date in your application logic
    pairId: number | null;
    forceServerId: number;
    asNumber: string;
    ispDesc: string;
    forcedCountry: string;
    bypassUa: boolean;
    playToken: string | null;
    lastExpirationVideo: string | null;
    packageId: number | null;
    accessToken: string | null;
    contact: string | null;
    lastActivity: number; // Consider converting to Date in your application logic
    lastActivityArray: string; // Consider parsing this if needed
    updated: number | null; // Consider converting to Date in your application logic
}