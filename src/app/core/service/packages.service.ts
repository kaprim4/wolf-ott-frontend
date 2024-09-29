import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IPackage } from '../interfaces/ipackage';
import { TokenService } from './token.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../interfaces/formType';

@Injectable({
  providedIn: 'root'
})
export class PackagesService extends BaseService<IPackage> {

  constructor(
    httpClient: HttpClient,
    tokenService: TokenService
) {
    super(httpClient, tokenService);
    this.endpoint = "packages";
}


public getAllPackages(search?: string): Observable<Array<IPackage>> {
    return this.getAllAsList<IPackage>(search || "");
}

public getPackages(search: string, page: number, size: number): Observable<Page<IPackage>> {
    return this.getAllAsPage<IPackage>(search, page, size);
}

public getPackage(id_package: number): Observable<HttpResponse<IPackage>> {
    return this.getOneById(id_package);
}

public addPackage(_package: IPackage): Observable<HttpResponse<IPackage>> {
    return this.add<IPackage>(_package);
}

public updatePackage(_package: IPackage): Observable<HttpResponse<IPackage>> {
    return this.update<IPackage>(_package.id, _package);
}

public deletePackage(id: number): Observable<HttpResponse<void>> {
    return this.delete<void>(id);
}
}
