import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';
import {IPackage} from '../models/package';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {Page} from '../models/page';
import {map, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PackageService extends CrudService<IPackage> {
    constructor(
        httpClient: HttpClient,
        jwtService: JwtService
    ) {
        super(httpClient, jwtService);
        this.endpoint = "packages";
    }

    public getAllPackages<T extends IPackage>(search?: string): Observable<T[]> {
        return this.getAllAsList<T>(search || "").pipe(
            map((packages: (IPackage | T)[]) => packages as T[]) // Type assertion
        );
    }

    public getPackages<T extends IPackage>(search: string, page: number, size: number): Observable<Page<T>> {
        return this.getAllAsPage<T>(search, page, size).pipe(
            map((page: Page<IPackage>) => ({
                ...page,
                content: page.content as T[] // Type assertion
            }))
        );
    }

    public getPackage<T extends IPackage>(id_package: number): Observable<T> {
        return this.getOneById(id_package).pipe(
            map(pkg => pkg.body as T)
        );
    }

    public addPackage(pkg: IPackage): Observable<HttpResponse<IPackage>> {
        return this.add(pkg);
    }

    public updatePackage(pkg: IPackage): Observable<HttpResponse<IPackage>> {
        return this.update(pkg.id, pkg);
    }

    public deletePackage(id: number): Observable<HttpResponse<void>> {
        return this.delete<void>(id);
    }

    public static getPackageExpirationDate(duration:number, durationIn:string) {
        const now = new Date(); // Get the current date and time
    
        switch (durationIn) {
            case "days":
                now.setDate(now.getDate() + duration); // Add days
                break;
            case "hours":
                now.setHours(now.getHours() + duration); // Add hours
                break;
            case "minutes":
                now.setMinutes(now.getMinutes() + duration); // Add minutes
                break;
            case "weeks":
                now.setDate(now.getDate() + duration * 7); // Add weeks (7 days per week)
                break;
            case "months":
                now.setMonth(now.getMonth() + duration); // Add months
                break;
            case "years":
                now.setFullYear(now.getFullYear() + duration); // Add years
                break;
            default:
                throw new Error("Invalid durationIn value. It must be 'days', 'hours', 'minutes', 'weeks', 'months', or 'years'.");
        }
    
        return now; // Return the calculated expiration date
    }
}
