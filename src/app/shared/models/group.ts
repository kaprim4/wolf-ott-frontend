export interface IGroup {
    groupId:number
}

export interface GroupList extends IGroup {
    groupName: string,
    isAdmin: boolean,
    isReseller: boolean
}
