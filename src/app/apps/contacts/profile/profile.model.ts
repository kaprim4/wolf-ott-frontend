export interface Comment {
    id: number;
    authorName: string;
    authorAvatar: string;
    content: {
        message?: string;
        media?: string
    };
    postedOn: string;
    replies?: Comment[];
}

export interface Post {
    id: number;
    authorName: string;
    authorAvatar: string;
    content: {
        message?: string;
        media?: string
    };
    postedOn: string;
    replies?: Comment[];
}