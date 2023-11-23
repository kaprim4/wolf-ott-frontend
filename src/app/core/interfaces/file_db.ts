export interface FileDb {
    id: string,
    imageName: string,
    imageType: string,
    imageData: any;
    isActivated: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}
