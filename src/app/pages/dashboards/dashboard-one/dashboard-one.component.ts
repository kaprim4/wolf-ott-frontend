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
import {GasStationService} from "../../../core/service/gas-station.service";
import {first} from "rxjs";
import {User} from "../../../core/models/user.models";
import {GasStation} from "../../../core/models/gas_station.models";

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
        private gasStationService: GasStationService
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
        this.fetch_gas_station_list();
    }

    fetch_gas_station_list(): void {
        // @ts-ignore
        this.gasStationService.getGasStations().pipe(first()).subscribe(
            (data: GasStation[]) => {
                if (data.length > 0)
                    console.table(data);
            },
            (error: string) => {
                console.log(error);
            }
        );
    }

    /**
     * fetches data
     */
    _fetchData(): void {
        this.messages = MESSAGES;
        this.recentProjects = PROJECTS;
    }

}
