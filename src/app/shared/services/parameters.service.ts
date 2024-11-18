import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {IRank} from "../models/rank";
import {CrudService} from "./crud.service";
import {JwtService} from "./jwt.service";
import {Page} from "../models/page";

@Injectable({
    providedIn: 'root'
})
export class ParameterService extends CrudService<IRank> {

    constructor(
        httpClient: HttpClient,
        jwtService: JwtService
    ) {
        super(httpClient, jwtService);
        this.endpoint = "ranks";
    }

    public getAllRanks<T extends IRank>(): Observable<T[]> {
        return this.getAllAsList2<T>().pipe(
            map((ranks: (IRank | T)[]) => ranks as T[]) // Type assertion
        );
    }

    public getRanks<T extends IRank>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<IRank>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }

    public getRank<T extends IRank>(id_package: number): Observable<T> {
        return this.getOneById(id_package).pipe(
            map(pkg => pkg.body as T)
        );
    }

    public addRank(pkg: IRank): Observable<HttpResponse<IRank>> {
        return this.add(pkg);
    }

    public updateRank(pkg: IRank): Observable<HttpResponse<IRank>> {
        return this.update(pkg.id, pkg);
    }

    public deleteRank(id: number): Observable<HttpResponse<void>> {
        return this.delete<void>(id);
    }
}
