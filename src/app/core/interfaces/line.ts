export interface ILineCompact {
    id: number;
    username: string;
    password: string;
    owner: string;
    status: number;
    online: boolean;
    trial: boolean;
    active: number;
    connections: number;
    expiration: string;
    lastConnection: string;

    [key: string]: number | string | any | boolean;
}

export interface ILine {
    accessToken: string;
    adminEnabled: number;
    adminNotes: string;
    allowedIps: string;
    allowedOutputs: string;
    allowedUa: string;
    asNumber: string;
    bouquet: string;
    bypassUa: boolean;
    contact: string;
    createdAt: string;
    enabled: number;
    expDate: string;
    forceServerId: number;
    forcedCountry: string;
    id: number;
    isE2: boolean;
    isIsplock: boolean;
    isMag: boolean;
    isRestreamer: boolean;
    isStalker: boolean;
    isTrial: boolean;
    ispDesc: string;
    lastActivity: string;
    lastActivityArray: string;
    lastExpirationVideo: string;
    lastIp: string;
    maxConnections: number;
    memberId: number;
    packageId: string;
    pairId: string;
    password: string;
    playToken: string;
    resellerNotes: string;
    updated: string;
    username: string;

    [key: string]: number | string | any | boolean;
}

