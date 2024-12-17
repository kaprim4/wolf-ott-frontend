import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {ILineActivity, LineActivityList, LineChartResponse} from '../models/line-activity';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {Page} from '../models/page';
import {map, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LineActivityService extends CrudService<ILineActivity> {
    constructor(httpClient: HttpClient, jwtService: JwtService) {
        super(httpClient, jwtService);
        this.endpoint = "lines/activities";
    }

    public getAllActivities<T extends ILineActivity>(search?: string): Observable<T[]> {
        // return this.getAllAsList<T>(search || "").pipe(
        //     map((lines: (ILineActivity | T)[]) => lines as T[]) // Type assertion
        // );
        throw Error("Method not implimented")
    }

    public getLineActivities<T extends ILineActivity>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<ILineActivity>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }

    public getLineActivitiesByUser<LineActivityList>(user_id: number, search: string, page: number, size: number): Observable<Page<LineActivityList>> {
        return this.httpClient
            .get<Page<LineActivityList>>(
                `${this.apiBaseUrl}/api/v1/${this.endpoint}/${user_id}`,
                {
                    headers: this.headers,
                    params: {
                        search: search,
                        page: page.toString(),
                        size: size.toString(),
                    },
                    observe: 'body',
                }
            )
            .pipe(map((response: Page<LineActivityList>) => {
                return response;
            }));
    }

    public getLineChart(limit: number): Observable<LineChartResponse[]> {
        return this.httpClient.get<LineChartResponse[]>(
            `${this.apiBaseUrl}/api/v1/${this.endpoint}/chart/${limit}`,
            { headers: this.headers }
        );
    }

    public getLineActivity<T extends ILineActivity>(id_line: number): Observable<T> {
        // return this.getOneById(id_line).pipe(map(res => res.body as T));
        throw Error("Method not implimented")
    }

    public addLineActivity(line: ILineActivity): Observable<HttpResponse<ILineActivity>> {
        // return this.add(line);
        throw Error("Method not implimented")
    }

    public updateLineActivity(line: ILineActivity): Observable<HttpResponse<ILineActivity>> {
        // return this.update(line.id, line);
        throw Error("Method not implimented")
    }

    public deleteLineActivity(id: number): Observable<HttpResponse<void>> {
        // return this.delete<void>(id);
        throw Error("Method not implimented")
    }
}
