import { Injectable } from '@angular/core';
import { IPreset } from '../models/preset';
import { CrudService } from './crud.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { map, Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class PresetService extends CrudService<IPreset> {
  constructor(
    httpClient: HttpClient,
    jwtService: JwtService
  ) {
    super(httpClient, jwtService);
    this.endpoint = "presets";
  }

  public getAllPresets<T extends IPreset>(search?: string): Observable<T[]> {
    return this.getAllAsList<T>(search || "").pipe(
      map((presets: (IPreset | T)[]) => presets as T[]) // Type assertion
    );
  }

  public getPresets<T extends IPreset>(search: string, page: number, size: number): Observable<Page<T>> {
    return this.getAllAsPage<T>(search, page, size).pipe(
      map((page: Page<IPreset>) => ({
        ...page,
        content: page.content as T[] // Type assertion
      }))
    );
  }

  public getPreset<T extends IPreset>(id_preset: number): Observable<T> {
    return this.getOneById(id_preset).pipe(map(res => res.body as T));
  }

  public addPreset(pkg: IPreset): Observable<HttpResponse<IPreset>> {
    return this.add(pkg);
  }

  public updatePreset(pkg: IPreset): Observable<HttpResponse<IPreset>> {
    return this.update(pkg.id, pkg);
  }

  public deletePreset(id: number): Observable<HttpResponse<void>> {
    return this.delete<void>(id);
  }
}
