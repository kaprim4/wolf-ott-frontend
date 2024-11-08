import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {IArticle} from "../models/article";
import {CrudService} from "./crud.service";
import {JwtService} from "./jwt.service";
import {Page} from "../models/page";

@Injectable({
    providedIn: 'root'
})
export class ArticleService extends CrudService<IArticle> {

    constructor(
        httpClient: HttpClient,
        jwtService: JwtService
    ) {
        super(httpClient, jwtService);
        this.endpoint = "article";
    }

    public getAllArticles<T extends IArticle>(search?: string): Observable<T[]> {
        return this.getAllAsList<T>(search || "").pipe(
            map((packages: (IArticle | T)[]) => packages as T[]) // Type assertion
        );
    }

    public getArticles<T extends IArticle>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<IArticle>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }

    public getArticle<T extends IArticle>(id_package: number): Observable<T> {
        return this.getOneById(id_package).pipe(
            map(pkg => pkg.body as T)
        );
    }

    public addArticle(article: IArticle): Observable<HttpResponse<IArticle>> {
        return this.add(article);
    }

    public updateArticle(article: IArticle): Observable<HttpResponse<IArticle>> {
        return this.update(article.id, article);
    }

    public deleteArticle(id: number): Observable<HttpResponse<void>> {
        return this.delete<void>(id);
    }
}
