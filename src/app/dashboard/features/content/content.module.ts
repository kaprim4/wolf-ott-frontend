import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ContentRoutes} from './content.routes';
import {SharedModule} from "../../../shared/shared.module";
import {ChannelsListComponent} from "./pages/channels-list/channels-list.component";
import {EpisodesListComponent} from "./pages/episodes-list/episodes-list.component";
import {MoviesListComponent} from "./pages/movies-list/movies-list.component";
import {StationsListComponent} from "./pages/stations-list/stations-list.component";
import {StreamsListComponent} from "./pages/streams-list/streams-list.component";
import {TvGuidesListComponent} from "./pages/tv-guides-list/tv-guides-list.component";


@NgModule({
    declarations: [
        ChannelsListComponent,
        EpisodesListComponent,
        MoviesListComponent,
        StationsListComponent,
        StreamsListComponent,
        TvGuidesListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(ContentRoutes),
        SharedModule
    ]
})
export class ContentModule {
}
