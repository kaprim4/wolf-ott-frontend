export interface IRank {
    id: number
}

export interface Rank extends IRank {
    title: string;
    minPoints: number;
    maxPoints: number;
    badgeImage: string;
}
