import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IBouquet } from '../interfaces/ibouquet';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Page } from '../interfaces/formType';

@Injectable({
    providedIn: 'root',
})
export class BouquetsService extends BaseService<IBouquet> {
    constructor(httpClient: HttpClient, tokenService: TokenService) {
        super(httpClient, tokenService);
        this.endpoint = 'bouquets';
    }

    public getAllBouquets(search: string): Observable<Array<IBouquet>> {
        return this.getAllAsList<IBouquet>(search);
    }

    public getBouquets(
        search: string,
        page: number,
        size: number
    ): Observable<Page<IBouquet>> {
        return this.getAllAsPage<IBouquet>(search, page, size);
    }

    public getBouquet(id_bouquet: number): Observable<HttpResponse<IBouquet>> {
        return this.getOneById<IBouquet>(id_bouquet);
    }

    public addBouquet(bouquet: IBouquet): Observable<HttpResponse<IBouquet>> {
        return this.add<IBouquet>(bouquet);
    }

    public updateBouquet(
        bouquet: IBouquet
    ): Observable<HttpResponse<IBouquet>> {
        return this.update<IBouquet>(bouquet.id, bouquet);
    }

    public deleteBouquet(id: number): Observable<HttpResponse<void>> {
        return this.delete<void>(id);
    }
}
