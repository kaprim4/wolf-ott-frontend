export interface IPackage {
    id: number;
    packageName: string;
    isAddon: boolean;
    isTrial: boolean;
    isOfficial: boolean;
    trialCredits: number;
    officialCredits: number;
    trialDuration: number;
    trialDurationIn: string;
    officialDuration: number;
    officialDurationIn: string;
    groups: string; // Consider parsing this as an array if needed
    bouquets: string; // Consider parsing this as an array if needed
    addonPackages: any | null; // Specify the type if known
    isLine: boolean;
    isMag: boolean;
    isE2: boolean;
    isRestreamer: boolean;
    isIsplock: boolean;
    outputFormats: string; // Consider parsing this as an array if needed
    forcedCountry: string | null;
}
