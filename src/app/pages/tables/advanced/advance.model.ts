// Table data
export interface Employee {
    name: string;
    position: string;
    office: string;
    age: number;
    date: string;
    salary: string;

    [key: string]: string | number;
}