export interface IPackage {
    id: number
}

export interface PackageList extends IPackage {
    packageName: string,
    isAddon: boolean,
    isTrial: boolean,
    isOfficial: boolean,
    trialCredits: number,
    officialCredits: number,
    trialDuration: number,
    trialDurationIn: string,
    officialDuration: number,
    officialDurationIn: string,
    groups: string,
    bouquets: string,
    addonPackages: string,
    isLine: boolean,
    isMag: boolean,
    isE2: boolean,
    isRestreamer: boolean,
    isIsplock: boolean,
    outputFormats: string,
    forcedCountry: string
}

export interface PackageDetail extends IPackage {
    packageName: string,
    isAddon: boolean,
    isTrial: boolean,
    isOfficial: boolean,
    trialCredits: number,
    officialCredits: number,
    trialDuration: number,
    trialDurationIn: string,
    officialDuration: number,
    officialDurationIn: string,
    groups: string,
    bouquets: string,
    addonPackages: string,
    isLine: boolean,
    isMag: boolean,
    isE2: boolean,
    isRestreamer: boolean,
    isIsplock: boolean,
    outputFormats: string,
    forcedCountry: string,
    lockDevice: boolean,
    checkCompatible: boolean
}