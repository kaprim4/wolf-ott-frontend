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
import {Region} from "../../../core/interfaces/region";
import {GasStation} from "../../../core/interfaces/gas_station";

@Component({
    selector: 'app-dashboard-1',
    templateUrl: './dashboard-one.component.html',
    styleUrls: ['./dashboard-one.component.scss']
})
export class DashboardOneComponent implements OnInit {

    messages: Message[] = [];
    recentProjects: Project[] = [];
    gasStationList: GasStation[] = [];

    constructor(
        private eventService: EventService,
        private authService: AuthenticationService,
        private tokenService: TokenService,
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
        this._fetchGasStationData();
        this._fetchData();
    }

    _fetchData(): void {
        this.messages = MESSAGES;
        this.recentProjects = PROJECTS;
    }

    private _fetchGasStationData() {
        this.gasStationService.getGasStations()?.subscribe(
            (data) => {
                if (data) {
                    data.map((gasStation:GasStation, index:number)=>{
                        if(gasStation.company.id == 2)
                            this.gasStationList.push(gasStation);
                    })
                }
            }
        );
    }

}
