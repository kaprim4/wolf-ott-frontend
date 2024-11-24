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

export interface ArticleCard extends Article {
    views: number;
    comments: number;
}
