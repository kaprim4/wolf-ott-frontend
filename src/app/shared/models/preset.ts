export interface IPreset {
    id: number
}

export interface PresetList extends IPreset {
    presetName: string,
    presetDescription: string,
    status: boolean,
    createdAt: Date
}

export interface PresetDetail extends IPreset {
    presetName: string,
    presetDescription: string,
    status: boolean,
    bouquets: number[],
    createdAt: Date,
    updatedAt: Date
}