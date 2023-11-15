import {GasStationService} from "../service/gas-station.service";

export interface InputProps {
    input: string,
    label: string,
    type: string,
    value:string | any,
    joinTable: Array<any>,
    joinTableId: string,
    joinTableIdLabel: string
}

export enum InputPropsTypesEnum {
    T = 'text',
    E = 'email',
    P = 'password',
    H = 'hidden',
    S = 'select',
    C = 'checkbox',
    D = 'date',
}
