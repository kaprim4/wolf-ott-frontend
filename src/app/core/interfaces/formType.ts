export interface IFormType {
    label: string,
    entity: string
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}
