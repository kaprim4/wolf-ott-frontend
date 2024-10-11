import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { IUser, UserList } from '../models/user';
import { map, Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<IUser> {
  constructor(
    httpClient: HttpClient,
    jwtService: JwtService
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