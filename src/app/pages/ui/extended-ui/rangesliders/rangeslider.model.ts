import { Options } from "@angular-slider/ngx-slider";

export interface SliderItem {
    title: string;
    default?: number;
    minValue?: number;
    maxValue?: number;
    options: Options;
}