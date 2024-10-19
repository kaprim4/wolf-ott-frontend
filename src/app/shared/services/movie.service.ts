import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {IMovie} from '../models/movie';
import {map, Observable} from 'rxjs';
import {Page} from '../models/page';

@Injectable({
    providedIn: 'root'
})
export class MovieService extends CrudService<IMovie> {
    constructor(
        httpClient: HttpClient,
        jwtService: JwtService
    ) {
        super(httpClient, jwtService);
        this.endpoint = "streams/types/movie";
    }

    public getAllMovies<T extends IMovie>(search?: string): Observable<T[]> {
        return this.getAllAsList<T>(search || "").pipe(
            map((movies: (IMovie | T)[]) => movies as T[]) // Type assertion
        );
    }

    public getMovies<T extends IMovie>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<IMovie>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }
}
