import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {environment} from "../environments/environment";
import { StorageService } from './shared/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { LineService } from './shared/services/line.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = environment.APP_NAME;

    constructor(){}
}
