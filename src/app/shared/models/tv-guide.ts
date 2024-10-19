
export interface ITvGuide {
    id: number;
    tvGuidename: string;
}

export interface TvGuideList{
    id: number;
    tvGuidename: string;
    email: string;
    credits: number;
    dateRegistered: string;
    notes: string;
    ip: string;
    lastLogin: string;
    status: boolean;

    [key: string]: number | string | any | boolean;
}
