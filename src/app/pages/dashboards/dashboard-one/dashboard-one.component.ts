import {Component, OnInit} from '@angular/core';

// constants
import {EventType} from 'src/app/core/constants/events';

// services
import {EventService} from 'src/app/core/service/event.service';

// types
import {Message, Project} from './dashboard.model';

// data
import {MESSAGES, PROJECTS} from './data';
import {GasStationService} from "../../../core/service/gas-station.service";
import {AuthenticationService} from "../../../core/service/auth.service";
import {TokenService} from "../../../core/service/token.service";

@Component({
    selector: 'app-dashboard-1',
    templateUrl: './dashboard-one.component.html',
    styleUrls: ['./dashboard-one.component.scss']
})
export class DashboardOneComponent implements OnInit {

    messages: Message[] = [];
    recentProjects: Project[] = [];

    constructor(
        private eventService: EventService,
        private authService: AuthenticationService,
        private tokenService: TokenService
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
        this._fetchData();
    }

    /**
     * fetches data
     */
    _fetchData(): void {
        this.messages = MESSAGES;
        this.recentProjects = PROJECTS;
    }

}
