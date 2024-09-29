import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

// types
import {Observable} from "rxjs";
import {ILine, ILineCompact} from "../interfaces/line";
import {TokenService} from "./token.service";
import { BaseService } from './base.service';

@Injectable({providedIn: 'root'})
export class LineCompactService extends BaseService<ILineCompact> {

    constructor(httpClient: HttpClient, tokenService: TokenService) {
        super(httpClient, tokenService);
        this.endpoint = 'lines';
    }

    public getAllLines(search: string): Observable<Array<ILineCompact>> {
        return this.getAllAsList<ILineCompact>(search);
    }

    public getLine(id_line: number): Observable<HttpResponse<ILineCompact>> {
        return this.getOneById<ILineCompact>(id_line);
    }

    public deleteLine(id: number): Observable<HttpResponse<void>> {
        return this.delete<void>(id);
    }
}
