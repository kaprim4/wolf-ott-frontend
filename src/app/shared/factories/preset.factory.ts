import { PresetDetail } from "../models/preset";

export class PresetFactory {
  static initPresetDetail(): PresetDetail {
    return {
        id: 0,
        presetName: '',
        presetDescription: '',
        status: true,
        bouquets: [],
        createdAt: new Date(),
        updatedAt: new Date()
    }
  }
}
