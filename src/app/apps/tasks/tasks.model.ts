// Kanban Board Data
export interface TaskItem {
    id: number;
    title: string;
    status: string;
    priority?: string;
    username: string;
    avatar: string;
    totalTasks: number;
    totalComments: number;
}

export interface Comment {
    id: number;
    avatar: string;
    username: string;
    text: string;
    replies?: Comment[];
}
