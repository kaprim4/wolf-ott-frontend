import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable, map } from 'rxjs';
import { Page } from '../interfaces/formType';
import { BaseService } from './base.service';
import {IPreset} from "../interfaces/ipreset";

@Injectable({
    providedIn: 'root',
})
export class PresetService extends BaseService<IPreset> {

    constructor(httpClient: HttpClient, tokenService: TokenService) {
        super(httpClient, tokenService);
        this.endpoint = 'presets';
    }

    public getAllPresets(search: string): Observable<Array<IPreset>> {
        return this.getAllAsList<IPreset>(search);
    }

    public getPresets(
        search: string,
        page: number,
        size: number
    ): Observable<Page<IPreset>> {
        return this.getAllAsPage<IPreset>(search, page, size);
    }

    public getPreset(id_preset: number): Observable<HttpResponse<IPreset>> {
        return this.getOneById<IPreset>(id_preset);
    }

    public addPreset(preset: IPreset): Observable<HttpResponse<IPreset>> {
        return this.add<IPreset>(preset);
    }

    public updatePreset(preset: IPreset): Observable<HttpResponse<IPreset>> {
        return this.update<IPreset>(preset.id, preset);
    }

    public deletePreset(id: number): Observable<HttpResponse<void>> {
        return this.delete<void>(id);
    }
}
