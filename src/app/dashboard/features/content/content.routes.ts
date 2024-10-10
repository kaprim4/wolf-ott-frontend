import { Routes } from '@angular/router';
import { StreamsListComponent } from './pages/streams-list/streams-list.component';
import { ChannelsListComponent } from './pages/channels-list/channels-list.component';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { EpisodesListComponent } from './pages/episodes-list/episodes-list.component';
import { StationsListComponent } from './pages/stations-list/stations-list.component';
import { TvGuidesListComponent } from './pages/tv-guides-list/tv-guides-list.component';


export const ContentRoutes: Routes = [
  {
    path: '',
    // component: AuthClassicLayout,
    children: [
      {
        path: '',
        redirectTo: 'streams/list',
        pathMatch: 'full'
      },
      {
        path: 'streams/list',
        component: StreamsListComponent
      },
      {
        path: 'channels/list',
        component: ChannelsListComponent
      },
      {
        path: 'movies/list',
        component: MoviesListComponent
      },
      {
        path: 'episods/list',
        component: EpisodesListComponent
      },
      {
        path: 'stations/list',
        component: StationsListComponent
      },
      {
        path: 'tv-guides/list',
        component: TvGuidesListComponent
      },
    ],
  },
];
