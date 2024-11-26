import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {ILine, LineDetail, LineList} from '../models/line';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {map, Observable} from 'rxjs';
import {Page} from '../models/page';
import { MatDialog } from '@angular/material/dialog';
import { QuickM3uComponent } from '../components/quick-m3u/quick-m3u.component';
import {environment} from "../../../environments/environment";
import { Patch } from '../models/patch';

@Injectable({
    providedIn: 'root'
})
export class LineService extends CrudService<ILine> {

    constructor(
        httpClient: HttpClient,
        jwtService: JwtService,
        public dialog: MatDialog
    ) {
        super(httpClient, jwtService);
        this.endpoint = "lines";
    }

    public getAllLines<T extends ILine>(search?: string): Observable<T[]> {
        return this.getAllAsList<T>(search || "").pipe(
            map((lines: (ILine | T)[]) => lines as T[]) // Type assertion
        );
    }

    public getLines<T extends ILine>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<ILine>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }

    public getAllLinesWithMemberId(memberId: number): Observable<number> {
        return this.httpClient.get<number>(`${this.apiBaseUrl}/api/v1/${this.endpoint}/member/${memberId}`, {headers: this.headers});
    }

    public getLastRegisteredLines(): Observable<LineList[]> {
        return this.httpClient.get<LineList[]>(`${this.apiBaseUrl}/api/v1/${this.endpoint}/last-registered`, {headers: this.headers});
    }

    public getLastWeekCount(): Observable<number> {
        return this.httpClient.get<number>(`${this.apiBaseUrl}/api/v1/${this.endpoint}/last-week-count`, {headers: this.headers});
    }

    public getCreatedLinesLastSixMonths(): Observable<{ [key: string]: number }> {
        return this.httpClient.get<{ [key: string]: number }>(`${this.apiBaseUrl}/api/v1/${this.endpoint}/created-last-six-months`, {headers: this.headers});
    }

    public getLine<T extends ILine>(id_line: number): Observable<T> {
        return this.getOneById(id_line).pipe(map(res => res.body as T));
    }

    public addLine<T extends ILine>(line: ILine): Observable<T> {
        return this.add(line).pipe(map(res => res.body as T));
    }

    public updateLine(line: ILine): Observable<HttpResponse<ILine>> {
        return this.update(line.id, line);
    }

    public deleteLine(id: number): Observable<HttpResponse<void>> {
        return this.delete<void>(id);
    }

    public static generateRandomUsername(length: number = 8): string {
        //const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        //const specialChars = '!@#$%^*()_+-[]{}|;:<>';
        const allCharacters = uppercase + lowercase + numbers;
        let username = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allCharacters.length);
            username += allCharacters[randomIndex];
        }
        return username;
    }

    public static generateRandomPassword(length: number = 12): string {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        //const specialChars = '!@#$%^*()_+-[]{}|;:<>';
        const allCharacters = uppercase + lowercase + numbers;

        let password = '';
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length)); // At least one uppercase
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length)); // At least one lowercase
        password += numbers.charAt(Math.floor(Math.random() * numbers.length)); // At least one number
        //password += specialChars.charAt(Math.floor(Math.random() * specialChars.length)); // At least one special character

        for (let i = 4; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allCharacters.length);
            password += allCharacters[randomIndex];
        }
        // Shuffle the password to ensure randomness
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    }


    public patch<T extends ILine>(id:number, patch:Patch): Observable<T>{
        const url = `${this.apiBaseUrl}/api/v1/${this.endpoint}/${id}`
        return this.httpClient.patch<HttpResponse<T>>(url, patch, {headers: this.headers}).pipe(map(res => res.body as T));;
    }

    public refreshVPN<T extends ILine>(id:number): Observable<T>{
        const url = `${this.apiBaseUrl}/api/v1/${this.endpoint}/${id}/vpn/refresh`
        return this.httpClient.post<HttpResponse<T>>(url, null, {headers: this.headers}).pipe(map(res => res.body as T));;
    }
}
