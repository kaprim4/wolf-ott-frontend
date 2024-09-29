import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

// types
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {Page} from "../interfaces/formType";
import { BaseService } from './base.service';
import {IPackage} from "../interfaces/ipackage";

@Injectable({providedIn: 'root'})
export class PackageService extends BaseService<IPackage> {

    constructor(
        httpClient: HttpClient,
        tokenService: TokenService
    ) {
        super(httpClient, tokenService);
        this.endpoint = "packages";
    }

    public getAllPackages(search: string): Observable<Array<IPackage>> {
        return this.getAllAsList<IPackage>(search);
    }

    public getPackages(search: string, page: number, size: number): Observable<Page<IPackage>> {
        return this.getAllAsPage<IPackage>(search, page, size);
    }

    public getPackage(id_package: number): Observable<HttpResponse<IPackage>> {
        return this.getOneById(id_package);
    }

    public addPackage(ipackage: IPackage): Observable<HttpResponse<IPackage>> {
        return this.add(ipackage);
    }

    public updatePackage(ipackage: IPackage): Observable<HttpResponse<IPackage>> {
        return this.update(ipackage.id, ipackage);
    }

    public deletePackage(id: number): Observable<HttpResponse<void>> {
        return this.delete<void>(id);
    }
}
