import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {IUser, IUserThemeOptions, IUserThemeOptionsRequest} from '../models/user';
import {map, Observable} from 'rxjs';
import {Page} from '../models/page';
import {LoggingService} from "../../services/logging.service";

@Injectable({
    providedIn: 'root'
})
export class UserService extends CrudService<IUser> {
    constructor(
        httpClient: HttpClient,
        jwtService: JwtService,
        private loggingService: LoggingService
    ) {
        super(httpClient, jwtService);
        this.endpoint = "users";
    }

    public getAllUsers<T extends IUser>(search?: string): Observable<T[]> {
        return this.getAllAsList<T>(search || "").pipe(
            map((users: (IUser | T)[]) => users as T[]) // Type assertion
        );
    }

    public getUsers<T extends IUser>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<IUser>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }

    public getUser<T extends IUser>(id_user: number): Observable<T> {
        return this.getOneById(id_user).pipe(map(res => res.body as T));
    }

    public addUser(user: IUser): Observable<HttpResponse<IUser>> {
        return this.add(user);
    }

    public updateUser(user: IUser): Observable<HttpResponse<IUser>> {
        this.loggingService.log("updateUser: ", user)
        return this.update(user.id, user);
    }

    public deleteUser(id: number): Observable<HttpResponse<void>> {
        return this.delete<void>(id);
    }

    public createUserThemeOptions(userThemeOptionsRequest: IUserThemeOptionsRequest): Observable<HttpResponse<IUserThemeOptions>> {
        return this.httpClient.post<IUserThemeOptions>(
            `${this.apiBaseUrl}/api/v1/${this.endpoint}/theme-options`, userThemeOptionsRequest,
            {headers: this.headers, observe: 'response'},
        );
    }

    public updateUserThemeOptions(id:number, userThemeOptionsRequest: IUserThemeOptionsRequest): Observable<HttpResponse<IUserThemeOptions>> {
        return this.httpClient.put<IUserThemeOptions>(
            `${this.apiBaseUrl}/api/v1/${this.endpoint}/theme-options/${id}`, userThemeOptionsRequest,
            {headers: this.headers, observe: 'response'},
        );
    }

}
