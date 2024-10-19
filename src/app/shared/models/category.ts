export interface ICategory {
    id: number
}

export interface CategoryList extends ICategory {
    type: string,
    name: string,
    order: number,
    isAdult: boolean
}