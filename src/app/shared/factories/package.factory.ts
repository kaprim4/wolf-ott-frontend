import { PackageDetail } from "../models/package";

export class PackageFactory {
    static initPackageDetail():PackageDetail {
        return {
            id: 0,
            packageName: '',
            isAddon: false,
            isTrial: false,
            isOfficial: false,
            trialCredits: 0,
            officialCredits: 0,
            trialDuration: 0,
            trialDurationIn: '',
            officialDuration: 0,
            officialDurationIn: '',
            groups: [],
            bouquets: [],
            addonPackages: '',
            isLine: false,
            isMag: false,
            isE2: false,
            isRestreamer: false,
            isIsplock: false,
            outputFormats: [],
            forcedCountry: '',
            lockDevice: false,
            checkCompatible: false
          };
    }
}
