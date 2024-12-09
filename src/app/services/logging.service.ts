import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";


@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    log(...message: any[]): void {
        if (environment.logging) {
            console.log(message);
        }
    }

    info(...message: any[]): void {
        if (environment.logging) {
            console.info(message);
        }
    }

    error(...message: any[]): void {
        if (environment.logging) {
            console.error(message);
        }
    }

    warn(...message: any[]): void {
        if (environment.logging) {
            console.warn(message);
        }
    }
}
