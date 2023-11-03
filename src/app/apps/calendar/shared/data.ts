import { EventInput } from "@fullcalendar/core";
import { ExternalEvent } from "./event.model";

export const CALENDAREVENTS: EventInput[] = [{
    id: '1',
    title: 'Meeting with Mr. Shreyu',
    start: new Date().setDate(new Date().getDate() + 2),
    end: new Date().setDate(new Date().getDate() + 4),
    classNames: ['bg-warning'],

},
{
    id: '2',
    title: 'Interview - Backend Engineer',
    start: new Date(),
    classNames: ['bg-success'],

},
{
    id: '3',
    title: 'Phone Screen - Frontend Engineer',
    start: new Date().setDate(new Date().getDate() + 2),
    classNames: ['bg-info'],

},
{
    id: '4',
    title: 'Buy Design Assets',
    start: new Date().setDate(new Date().getDate() + 4),
    end: new Date().setDate(new Date().getDate() + 5),
    classNames: ['bg-primary'],

}];

export const EXTERNALEVENTS: ExternalEvent[] = [
    {
        id: 1,
        title: 'New Theme Release',
        type: 'primary',
    },
    {
        id: 2,
        title: 'My Event',
        type: 'pink',
    },
    {
        id: 3,
        title: 'Meet Manager',
        type: 'warning',
    },
    {
        id: 4,
        title: 'Report Error',
        type: 'purple',
    }
]