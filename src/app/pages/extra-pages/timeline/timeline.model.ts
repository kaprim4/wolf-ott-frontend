interface TimelinePost {
    id: number;
    variant?: string;
    postedOn?: string;
    time?: string;
    content?: string;
}

export interface TimelineItem {
    id?: number;
    day?: string;
    posts?: TimelinePost[];
}