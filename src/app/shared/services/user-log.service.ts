import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtService} from './jwt.service';
import {IUserLog} from '../models/user-log';
import {map, Observable} from 'rxjs';
import {CrudService} from './crud.service';
import {Page} from '../models/page';

@Injectable({
    providedIn: 'root'
})
export class UserLogService extends CrudService<IUserLog> {
    constructor(
        httpClient: HttpClient,
        jwtService: JwtService
    ) {
        super(httpClient, jwtService);
        this.endpoint = "users/logs";
    }

    public getAllLogs<T extends IUserLog>(search?: string): Observable<T[]> {
        // return this.getAllAsList<T>(search || "").pipe(
        //     map((users: (IUserLog | T)[]) => users as T[]) // Type assertion
        // );
        throw Error("Method not implimented")
    }

    public getUserLogs<T extends IUserLog>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<IUserLog>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }

    public getUserLog<T extends IUserLog>(id_log: number): Observable<T> {
        // return this.getOneById(id_user).pipe(map(res => res.body as T));
        throw Error("Method not implimented")
    }

    public addUserLog(log: IUserLog): Observable<HttpResponse<IUserLog>> {
        // return this.add(user);
        throw Error("Method not implimented")
    }

    public updateUserLog(log: IUserLog): Observable<HttpResponse<IUserLog>> {
        // return this.update(user.id, user);
        throw Error("Method not implimented")
    }

    public deleteUserLog(id: number): Observable<HttpResponse<void>> {
        // return this.delete<void>(id);
        throw Error("Method not implimented")
    }
}
