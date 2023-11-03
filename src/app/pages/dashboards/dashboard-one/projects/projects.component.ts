import {Component, Input, OnInit} from '@angular/core';
// types
import {Project} from '../dashboard.model';

@Component({
    selector: 'app-dashboard-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

    @Input() recentProjects: Project[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

}
