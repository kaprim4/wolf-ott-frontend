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
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-dashboard-1',
    templateUrl: './dashboard-one.component.html',
    styleUrls: ['./dashboard-one.component.scss']
})
export class DashboardOneComponent implements OnInit {

    messages: Message[] = [];
    recentProjects: Project[] = [];
    gasStationList: GasStation[] = [];

    loading:boolean = false;
    error:string = '';

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
        this.loading = true;
        this._fetchGasStationData();
        this._fetchData();
    }

    _fetchData(): void {
        this.messages = MESSAGES;
        this.recentProjects = PROJECTS;
    }

    private _fetchGasStationData() {
        this.gasStationService.getGasStations()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    data.body.map((gasStation:GasStation, index:number)=>{
                        if(gasStation.company.id == 2)
                            this.gasStationList.push(gasStation);
                    })
                }
                console.log('This contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                    this.error = err.message;
                    this.loading = false;
                }
            }
        );
    }

}
