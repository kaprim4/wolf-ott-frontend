export interface IArticle {
    id: number;
}

export interface Article extends IArticle {
    title: string;
    content: string;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
}
