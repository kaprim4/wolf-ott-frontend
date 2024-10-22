export interface ILog {
    id: number;
    name: string;
}

export interface ActivityLogList extends ILog {
    id: number;
    name: string;
    Quality: string;
    Line: string;
    Stream: string;
    Player: string;
    ISP: string;
    IP: string;
    Duration: string;
    Output: string;

    [key: string]: number | string | any | boolean;
}
