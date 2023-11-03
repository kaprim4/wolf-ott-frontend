
export interface ChatUser {
    id?: number;
    name?: string;
    avatar?: string;
    icon?: string;
    variant?: string;
    lastMessage?: string;
    lastMessageOn?: string;
    lastMessageSeen?: boolean;
    status?: 'busy' | 'online' | 'away' | 'offline';
}

export interface ChatMessage {
    id: number;
    from: ChatUser;
    to: ChatUser;
    message: {
        type?: string;
        value?: any;
    }[];
    sendOn?: string;
}