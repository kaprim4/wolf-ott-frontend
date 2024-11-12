export interface IArticle {
    id: number;
}

export interface Article extends IArticle {
    title: string;
    content: string;
    thumbnail: string;
    createdAt?: Date;
    updatedAt?: Date;
}
