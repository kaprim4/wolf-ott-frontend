import {Routes} from '@angular/router';
import {StreamsListComponent} from './pages/streams-list/streams-list.component';
import {ChannelsListComponent} from './pages/channels-list/channels-list.component';
import {MoviesListComponent} from './pages/movies-list/movies-list.component';
import {EpisodesListComponent} from './pages/episodes-list/episodes-list.component';
import {StationsListComponent} from './pages/stations-list/stations-list.component';
import {TvGuidesListComponent} from './pages/tv-guides-list/tv-guides-list.component';


export const ContentRoutes: Routes = [
    {
        path: '',
        // component: AuthClassicLayout,
        children: [
            {
                path: '',
                data: {
                    title: 'Streams',
                },
                redirectTo: 'streams/list',
                pathMatch: 'full'
            },
            {
                path: 'streams/list',
                data: {
                    title: 'Streams',
                },
                component: StreamsListComponent
            },
            {
                path: 'channels/list',
                data: {
                    title: 'Created Channels',
                },
                component: ChannelsListComponent
            },
            {
                path: 'movies/list',
                data: {
                    title: 'Movies',
                },
                component: MoviesListComponent
            },
            {
                path: 'episods/list',
                data: {
                    title: 'Episodes',
                },
                component: EpisodesListComponent
            },
            {
                path: 'stations/list',
                data: {
                    title: 'Radio Stations',
                },
                component: StationsListComponent
            },
            {
                path: 'tv-guides/list',
                data: {
                    title: 'TV Guide',
                },
                component: TvGuidesListComponent
            },
        ],
    },
];
