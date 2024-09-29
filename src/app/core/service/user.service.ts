import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

// types
import {Observable} from "rxjs";
import {IUser} from "../interfaces/user";
import {TokenService} from "./token.service";
import {Page} from "../interfaces/formType";
import { BaseService } from './base.service';

@Injectable({providedIn: 'root'})
export class UserService extends BaseService<IUser> {

    constructor(
        httpClient: HttpClient,
        tokenService: TokenService
    ) {
        super(httpClient, tokenService);
        this.endpoint = "users";
    }

    public getAllUsers(search: string): Observable<Array<IUser>> {
        return this.getAllAsList<IUser>(search);
    }

    public getUsers(search: string, page: number, size: number): Observable<Page<IUser>> {
        return this.getAllAsPage<IUser>(search, page, size);
    }

    public getUser(id_user: number): Observable<HttpResponse<IUser>> {
        return this.getOneById(id_user);
    }

    public addUser(user: IUser): Observable<HttpResponse<IUser>> {
        return this.add(user);
    }

    public updateUser(user: IUser): Observable<HttpResponse<IUser>> {
        return this.update(user.id, user);
    }

    public deleteUser(id: number): Observable<HttpResponse<void>> {
        return this.delete<void>(id);
    }
}
