
export interface IChannel {
    id: number;
    channelname: string;
}

export interface ChannelList{
    id: number;
    channelname: string;
    email: string;
    credits: number;
    dateRegistered: string;
    notes: string;
    ip: string;
    lastLogin: string;
    status: boolean;

    [key: string]: number | string | any | boolean;
}
