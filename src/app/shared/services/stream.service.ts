import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {IStream} from '../models/stream';
import {map, Observable} from 'rxjs';
import {Page} from '../models/page';

@Injectable({
    providedIn: 'root'
})
export class StreamService extends CrudService<IStream> {
    constructor(
        httpClient: HttpClient,
        jwtService: JwtService
    ) {
        super(httpClient, jwtService);
        this.endpoint = "streams/types/live";
    }

    public getAllStreams<T extends IStream>(search?: string): Observable<T[]> {
        return this.getAllAsList<T>(search || "").pipe(
            map((streams: (IStream | T)[]) => streams as T[]) // Type assertion
        );
    }

    public getStreams<T extends IStream>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<IStream>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }
}
