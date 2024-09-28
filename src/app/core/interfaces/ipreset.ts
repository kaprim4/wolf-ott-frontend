export interface IPreset {
    id: number;
    presetName: string;
    presetDescription: string;
    status: boolean;
    bouquets: number[];
    createdAt: string; // or Date if you prefer to handle it as a Date object
    updatedAt: string; // or Date for consistency
}
