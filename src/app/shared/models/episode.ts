
export interface IEpisode {
    id: number;
    episodename: string;
}

export interface EpisodeList{
    id: number;
    episodename: string;
    email: string;
    credits: number;
    dateRegistered: string;
    notes: string;
    ip: string;
    lastLogin: string;
    status: boolean;

    [key: string]: number | string | any | boolean;
}
