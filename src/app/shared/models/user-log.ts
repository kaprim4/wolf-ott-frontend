export interface IUserLog {
    id: number
}

export interface UserLogList extends IUserLog {
    "owner_id": number,
    "owner_username": string,
    "type": string,
    "line_id": number,
    "line_username": string,
    "user_id": number,
    "user_username": string,
    "package_id": number,
    "package_name": string,
    "action": string,
    "cost": number,
    "credit": number,
    "date": Date
}