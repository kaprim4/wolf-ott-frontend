import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { IGroup } from '../models/group';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { map, Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends CrudService<IGroup> {
  constructor(
    httpClient: HttpClient,
    jwtService: JwtService
) {
    super(httpClient, jwtService);
    this.endpoint = "groups";
}

public getAllGroups<T extends IGroup>(search?: string): Observable<T[]> {
  return this.getAllAsList<T>(search || "").pipe(
      map((groups: (IGroup | T)[]) => groups as T[]) // Type assertion
  );
}

public getGroups<T extends IGroup>(search: string, page: number, size: number): Observable<Page<T>> {
  return this.getAllAsPage<T>(search, page, size).pipe(
      map((page: Page<IGroup>) => ({
          ...page,
          content: page.content as T[] // Type assertion
      }))
  );
}

public getGroup<T extends IGroup>(id_group: number): Observable<T> {
  return this.getOneById(id_group).pipe(map(res => res.body as T));
}

public addGroup(group: IGroup): Observable<HttpResponse<IGroup>> {
  return this.add(group);
}

public updateGroup(group: IGroup): Observable<HttpResponse<IGroup>> {
  return this.update(group.groupId, group);
}

public deleteGroup(id: number): Observable<HttpResponse<void>> {
  return this.delete<void>(id);
}

}
