import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

// types
import {Observable} from "rxjs";
import {ILine} from "../interfaces/line";
import {TokenService} from "./token.service";
import {Page} from "../interfaces/formType";
import { BaseService } from './base.service';

@Injectable({providedIn: 'root'})
export class LineService extends BaseService<ILine> {

    constructor(httpClient: HttpClient, tokenService: TokenService) {
        super(httpClient, tokenService);
        this.endpoint = 'lines';
    }

    public getAllLines(search: string): Observable<Array<ILine>> {
        return this.getAllAsList<ILine>(search);
    }

    public getLines(search: string, page: number, size: number): Observable<Page<ILine>> {
        return this.getAllAsPage<ILine>(search, page, size);
    }

    public getLine(id_line: number): Observable<HttpResponse<ILine>> {
        return this.getOneById<ILine>(id_line);
    }

    public addLine(line: ILine): Observable<HttpResponse<ILine>> {
        return this.add<ILine>(line);
    }

    public updateLine(line: ILine): Observable<HttpResponse<ILine>> {
        return this.update<ILine>(line.id, line);
    }

    public deleteLine(id: number): Observable<HttpResponse<void>> {
        return this.delete<void>(id);
    }
}
