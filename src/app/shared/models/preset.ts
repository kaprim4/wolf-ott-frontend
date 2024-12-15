export interface IPreset {
    id: number
}

export interface PresetList extends IPreset {
    presetName: string,
    presetDescription: string,
    status: boolean,
    createdAt: Date
}

export interface UserDTO {
    id: number,
    username: string
}

export interface PresetDetail extends IPreset {
    user: any,
    presetName: string,
    presetDescription: string,
    status: boolean,
    bouquets: number[],
    createdAt: Date,
    updatedAt: Date
}
