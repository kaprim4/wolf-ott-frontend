import { LabelType } from "@angular-slider/ngx-slider";
import { SliderItem } from "./rangeslider.model";

export const SLIDERVARIANTS: SliderItem[] = [
    {
        title: 'Default',
        default: 30,
        options: {
            floor: 10,
            ceil: 100
        }
    },
    {
        title: 'Range Slider',
        minValue: 50,
        maxValue: 200,
        options: {
            floor: 0,
            ceil: 250
        }
    },
    {
        title: 'Slider with push range',
        minValue: 40,
        maxValue: 60,
        options: {
            floor: 0,
            ceil: 100,
            step: 1,
            minRange: 10,
            maxRange: 30,
            pushRange: true
        }
    },
    {
        title: 'Slider with custom step value',
        default: 30,
        options: {
            floor: 0,
            ceil: 100,
            step: 10
        }
    },
    {
        title: 'Slider with custom display function ',
        default: 100,
        options: {
            floor: 0,
            ceil: 500,
            translate: (value: number): string => {
                return '$' + value;
            }
        }
    },
    {
        title: 'Display function using HTML formatting',
        minValue: 100,
        maxValue: 400,
        options: {
            floor: 0,
            ceil: 500,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Low:
                        return '<b>Min price:</b> $' + value;
                    case LabelType.High:
                        return '<b>Max price:</b> $' + value;
                    default:
                        return '$' + value;
                }
            }
        }
    },
    {
        title: 'Slider with ticks and values',
        default: 5,
        options: {
            floor: 0,
            ceil: 10,
            showTicks: true,
            showTicksValues: true
        }
    },
    {
        title: 'Slider with ticks at specific positions',
        default: 55,
        options: {
            floor: 0,
            ceil: 100,
            ticksArray: [0, 10, 25, 50, 100]
        }
    },
    {
        title: 'Slider with ticks values and legend 0',
        default: 5,
        options: {
            showTicksValues: true,
            stepsArray: [
                { value: 1, legend: 'Very poor' },
                { value: 2 },
                { value: 3, legend: 'Fair' },
                { value: 4 },
                { value: 5, legend: 'Average' },
                { value: 6 },
                { value: 7, legend: 'Good' },
                { value: 8 },
                { value: 9, legend: 'Excellent' }
            ]
        }
    },
    {
        title: 'Slider with logarithmic scale',
        default: 1,
        options: {
            floor: 1,
            ceil: 100,
            logScale: true,
            showTicks: true
        }
    },
    {
        title: 'Disabled slider',
        default: 20,
        options: {
            floor: 0,
            ceil: 100,
            step: 10,
            disabled: true,
            showTicks: true,
            draggableRange: true
        }
    },
    {
        title: 'Read Only',
        default: 50,
        options: {
            floor: 0,
            ceil: 100,
            readOnly: true
        }
    }
];