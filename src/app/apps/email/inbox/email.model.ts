export interface Email {
    id: number;
    from_name: string;
    from_email: string;
    subject: string;
    teaser: string;
    number_of_reply: number;
    is_important: boolean;
    is_read: boolean;
    time: string;
    date: string;
    label?: string;
}
