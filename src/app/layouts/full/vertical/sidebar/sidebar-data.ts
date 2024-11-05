import { QuickM3uComponent } from 'src/app/shared/components/quick-m3u/quick-m3u.component';
import {NavItem} from './nav-item/nav-item';
import {QuickXtreamComponent} from "../../../../shared/components/quick-xtream/quick-xtream.component";

export const navItems: NavItem[] = [
    {
        navCap: 'Menu',
    },
    {
        displayName: 'Dashboard',
        iconName: 'layout-dashboard',
        bgcolor: 'primary',
        route: '/dashboard',
    },
    {
        displayName: 'Quick M3U',
        subtext: 'Generate a M3U link',
        iconName: 'comet',
        bgcolor: 'warning',
        route: '',
        chip: true,
        chipContent: 'New',
        chipClass: 'warning',
        openDialog: QuickM3uComponent
    },
    {
        displayName: 'Quick Xtream',
        subtext: 'Generate a Quick Xtream link',
        iconName: 'stars',
        bgcolor: 'error',
        route: '',
        chip: true,
        chipContent: 'New',
        chipClass: 'error',
        openDialog: QuickXtreamComponent
    },
    {
        navCap: 'Apps',
    },
    {
        displayName: 'Users',
        iconName: 'user-shield',
        bgcolor: 'primary',
        route: '/apps/users/list',
    },
    {
        displayName: 'Lines',
        iconName: 'timeline-event',
        bgcolor: 'primary',
        children: [
            {
                displayName: 'User Lines',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/lines/users/list',
            },
            {
                displayName: 'MAG Devices',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/lines/devices/mag/list',
            },
            {
                displayName: 'ENIGMA Devices',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/lines/devices/enigma/list',
            },
        ],
    },
    {
        displayName: 'Contents',
        iconName: 'satellite',
        bgcolor: 'primary',
        children: [
            {
                displayName: 'Streams',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/contents/streams/list',
            },
            {
                displayName: 'Channels',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/contents/channels/list',
            },
            {
                displayName: 'Movies',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/contents/movies/list',
            },
            {
                displayName: 'Episodes',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/contents/episods/list',
            },
            {
                displayName: 'Stations',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/contents/stations/list',
            },
            {
                displayName: 'TV Guide',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/contents/tv-guids/list',
            },
        ],
    },
    {
        displayName: 'Logs',
        iconName: 'chart-donut-3',
        bgcolor: 'primary',
        children: [
            {
                displayName: 'Live Connections',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/logs/live-connections/list',
            },
            {
                displayName: 'Activity Logs',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/logs/activities/list',
            },
            {
                displayName: 'User Logs',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/logs/users/list',
            },
        ],
    },
    {
        displayName: 'Bundles',
        iconName: 'packages',
        bgcolor: 'success',
        children: [
            {
                displayName: 'Packages',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/bundles/packages/list',
            },
            {
                displayName: 'Bouquets',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/bundles/bouquets/list',
            },
            {
                displayName: 'Presets',
                iconName: 'point',
                bgcolor: 'tranparent',
                route: '/apps/bundles/presets/list',
            },
        ],
    },
];
