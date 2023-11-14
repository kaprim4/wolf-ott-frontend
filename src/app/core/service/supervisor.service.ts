import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Supervisor} from "../interfaces/supervisor";

@Injectable({
    providedIn: 'root'
})
export class SupervisorService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient
    ) { }

    public getSupervisors(): Observable<Supervisor[]> {
        return this.http.get<Supervisor[]>(`${this.apiServerUrl}/api/v1/supervisors/all`);
    }

    public getSupervisor(id: number): Observable<Supervisor> {
        return this.http.get<Supervisor>(`${this.apiServerUrl}/api/v1/supervisors/find/${id}`);
    }

    public addSupervisor(supervisor: Supervisor): Observable<Supervisor> {
        return this.http.post<Supervisor>(`${this.apiServerUrl}/api/v1/supervisors/add`, supervisor);
    }

    public updateSupervisor(supervisor: Supervisor): Observable<Supervisor> {
        return this.http.put<Supervisor>(`${this.apiServerUrl}/api/v1/supervisors/update`, supervisor);
    }

    public deleteSupervisor(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/supervisors/delete/${id}`);
    }
}
