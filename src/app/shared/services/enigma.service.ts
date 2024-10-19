import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { IEnigma } from '../models/enigma';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Page } from '../models/page';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class EnigmaService extends CrudService<IEnigma> {

  constructor(
    httpClient: HttpClient,
    jwtService: JwtService
) {
    super(httpClient, jwtService);
    this.endpoint = "devices/enigma2";
}

  public getAllEnigmas<T extends IEnigma>(search?: string): Observable<T[]> {
    return this.getAllAsList<T>(search || "").pipe(
        map((enigmas: (IEnigma | T)[]) => enigmas as T[]) // Type assertion
    );
}

public getEnigmas<T extends IEnigma>(search: string, page: number, size: number): Observable<Page<T>> {
    return this.getAllAsPage<T>(search, page, size).pipe(
        map((page: Page<IEnigma>) => ({
            ...page,
            content: page.content as T[] // Type assertion
        }))
    );
}

public getEnigma<T extends IEnigma>(id_enigma: number): Observable<T> {
    return this.getOneById(id_enigma).pipe(
        map(res => res.body as T)
    );
}

public addEnigma(enigma: IEnigma): Observable<HttpResponse<IEnigma>> {
    return this.add(enigma);
}

public updateEnigma(enigma: IEnigma): Observable<HttpResponse<IEnigma>> {
    return this.update(enigma.id, enigma);
}

public deleteEnigma(id: number): Observable<HttpResponse<void>> {
    return this.delete<void>(id);
}
}
