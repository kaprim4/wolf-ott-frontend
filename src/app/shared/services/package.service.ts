import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { IPackage } from '../models/package';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { Page } from '../models/page';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService extends CrudService<IPackage> {
  constructor(
    httpClient: HttpClient,
    jwtService: JwtService
  ) {
    super(httpClient, jwtService);
    this.endpoint = "packages";
  }

  public getAllPackages<T extends IPackage>(search?: string): Observable<T[]> {
    return this.getAllAsList<T>(search || "").pipe(
      map((packages: (IPackage | T)[]) => packages as T[]) // Type assertion
    );
  }

  public getPackages<T extends IPackage>(search: string, page: number, size: number): Observable<Page<T>> {
    return this.getAllAsPage<T>(search, page, size).pipe(
      map((page: Page<IPackage>) => ({
        ...page,
        content: page.content as T[] // Type assertion
      }))
    );
  }

  public getPackage(id_package: number): Observable<HttpResponse<IPackage>> {
    return this.getOneById(id_package);
  }

  public addPackage(pkg: IPackage): Observable<HttpResponse<IPackage>> {
    return this.add(pkg);
  }

  public updatePackage(pkg: IPackage): Observable<HttpResponse<IPackage>> {
    return this.update(pkg.id, pkg);
  }

  public deletePackage(id: number): Observable<HttpResponse<void>> {
    return this.delete<void>(id);
  }
}
