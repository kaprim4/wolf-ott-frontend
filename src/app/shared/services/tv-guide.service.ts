import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {ITvGuide} from '../models/tv-guide';
import {map, Observable} from 'rxjs';
import {Page} from '../models/page';

@Injectable({
    providedIn: 'root'
})
export class TvGuideService extends CrudService<ITvGuide> {
    constructor(
        httpClient: HttpClient,
        jwtService: JwtService
    ) {
        super(httpClient, jwtService);
        this.endpoint = "tvGuides";
    }

    public getAllTvGuides<T extends ITvGuide>(search?: string): Observable<T[]> {
        return this.getAllAsList<T>(search || "").pipe(
            map((tvGuides: (ITvGuide | T)[]) => tvGuides as T[]) // Type assertion
        );
    }

    public getTvGuides<T extends ITvGuide>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<ITvGuide>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }
}
