import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {IStation} from '../models/station';
import {map, Observable} from 'rxjs';
import {Page} from '../models/page';

@Injectable({
    providedIn: 'root'
})
export class StationService extends CrudService<IStation> {
    constructor(
        httpClient: HttpClient,
        jwtService: JwtService
    ) {
        super(httpClient, jwtService);
        this.endpoint = "streams/types/radio_streams";
    }

    public getAllStations<T extends IStation>(search?: string): Observable<T[]> {
        return this.getAllAsList<T>(search || "").pipe(
            map((stations: (IStation | T)[]) => stations as T[]) // Type assertion
        );
    }

    public getStations<T extends IStation>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<IStation>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }
}
