export interface Message {
    id: number;
    avatar: string;
    sender: string;
    text: string;
    time: string;
}

export interface Project {
    id: number;
    name: string;
    startDate: string;
    dueDate: string;
    status: string;
    variant: string;
    assignee: string;
}
