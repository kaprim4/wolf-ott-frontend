import { CountUpOptions } from 'countup.js';

export interface Layout {
    name: string;
    image: string;
    link: string;
}

export interface Testimonial {
    id: number;
    clientName: string;
    title: string;
    avatar: string;
    message: string;
}

export interface Statistic {
    icon: string;
    title: string;
    value: number;
    counterOptions: CountUpOptions;
}


export interface Service {
    image: string;
    title: string;
    shortDesc: string;
}
