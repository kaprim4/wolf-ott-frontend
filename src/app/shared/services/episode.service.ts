import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {IEpisode} from '../models/episode';
import {map, Observable} from 'rxjs';
import {Page} from '../models/page';

@Injectable({
    providedIn: 'root'
})
export class EpisodeService extends CrudService<IEpisode> {
    constructor(
        httpClient: HttpClient,
        jwtService: JwtService
    ) {
        super(httpClient, jwtService);
        this.endpoint = "episodes";
    }

    public getAllEpisodes<T extends IEpisode>(search?: string): Observable<T[]> {
        return this.getAllAsList<T>(search || "").pipe(
            map((episodes: (IEpisode | T)[]) => episodes as T[]) // Type assertion
        );
    }

    public getEpisodes<T extends IEpisode>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<IEpisode>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }
}
