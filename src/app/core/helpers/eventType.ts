import { EventType } from "../constants/events";


/**
 * Defines subscriber event
 */
export class AppEvent<T> {
    constructor (
        public type: EventType,
        public payload: T,
    ) { }
}