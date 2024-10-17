import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {map, Observable} from 'rxjs';
import {Page} from '../models/page';
import {IChannel} from "../models/channel";

@Injectable({
    providedIn: 'root'
})
export class ChannelService extends CrudService<IChannel> {
    constructor(
        httpClient: HttpClient,
        jwtService: JwtService
    ) {
        super(httpClient, jwtService);
        this.endpoint = "channels";
    }

    public getAllChannels<T extends IChannel>(search?: string): Observable<T[]> {
        return this.getAllAsList<T>(search || "").pipe(
            map((channels: (IChannel | T)[]) => channels as T[]) // Type assertion
        );
    }

    public getChannels<T extends IChannel>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<IChannel>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }
}
