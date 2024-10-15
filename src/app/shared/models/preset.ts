export interface IPreset {
    id: number
}

export interface PresetList extends IPreset {
    presetName: string,
    presetDescription: string,
    status: boolean,
    createdAt: Date
}