import { LineDetail } from "../models/line";

export class LineFactory {
    static initLineDetail():LineDetail {
        return {
            id: 0,
            memberId: 0,
            username: '',
            password: '',
            lastIp: '',
            expDate: 0,
            adminEnabled: false,
            enabled: true,
            adminNotes: null,
            resellerNotes: null,
            bouquets: [],
            allowedOutputs: [],
            maxConnections: 1,
            isRestreamer: false,
            isTrial: false,
            isMag: false,
            isE2: false,
            isStalker: false,
            isIsplock: false,
            allowedIps: [],
            allowedUa: [],
            createdAt: 0,
            pairId: null,
            forceServerId: 0,
            asNumber: '',
            ispDesc: '',
            forcedCountry: '',
            bypassUa: false,
            playToken: null,
            lastExpirationVideo: null,
            packageId: null,
            usePreset: false,
            accessToken: null,
            contact: null,
            lastActivity: 0,
            lastActivityArray: {},
            updated: null
          };
    }
}
