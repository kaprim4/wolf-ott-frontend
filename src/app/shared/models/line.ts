export interface ILine {
    id: number
}

export interface LineList extends ILine {
    username: string,
    memberId: number,
    password: string,
    owner: string,
    status: string,
    online: string,
    trial: boolean,
    active: number,
    connections: number,
    expiration: Date,
    lastConnection: Date
}