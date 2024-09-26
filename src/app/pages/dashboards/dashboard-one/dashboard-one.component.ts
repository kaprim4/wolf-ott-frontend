import {Component, OnInit} from '@angular/core';

// constants
import {EventType} from 'src/app/core/constants/events';

// services
import {EventService} from 'src/app/core/service/event.service';

// types
import {Message, Project} from './dashboard.model';

// data
import {MESSAGES, PROJECTS} from './data';
import {AuthenticationService} from "../../../core/service/auth.service";
import {TokenService} from "../../../core/service/token.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {UserService} from "../../../core/service/user.service";
import {IUser} from "../../../core/interfaces/user";

@Component({
    selector: 'app-dashboard-1',
    templateUrl: './dashboard-one.component.html',
    styleUrls: ['./dashboard-one.component.scss']
})
export class DashboardOneComponent implements OnInit {

    messages: Message[] = [];
    recentProjects: Project[] = [];
    records: IUser[] = [];

    loading:boolean = false;
    error:string = '';

    constructor(
        private eventService: EventService,
        private authService: AuthenticationService,
        private tokenService: TokenService,
        private userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE,
            {
                title: 'Tableau de bord',
                breadCrumbItems: [
                    {label: 'Tableau de bord', path: '/'},
                    {label: 'Tableau de bord', path: '/', active: true}
                ]
            }
        );
        this.loading = true;
        this._fetchGasStationData();
        this._fetchData();
    }

    _fetchData(): void {
        this.messages = MESSAGES;
        this.recentProjects = PROJECTS;
    }

    private _fetchGasStationData() {
        this.userService.getUsers('', 0, 100000)?.subscribe(
            (pageData) => {
                this.records = pageData.content;
                this.loading = false;
                console.log('This contains body: ', pageData);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
            }
        );
    }

}
