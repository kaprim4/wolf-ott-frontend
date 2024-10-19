
export interface IChannel {
    id: number;
    channelname: string;
}

export interface ChannelList extends IChannel{
    id: number;
    name: string,
    categories: number[],
    [key: string]: number | string | any | boolean;
}
