import {NavItem} from './nav-item/nav-item';

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
        navCap: 'Apps',
    },
    {
        displayName: 'Users',
        iconName: 'user-shield',
        bgcolor: 'warning',
        route: '/apps/users',
    },
    {
        displayName: 'Lines',
        iconName: 'timeline-event',
        bgcolor: 'success',
        route: '/apps/lines',
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
        bgcolor: 'success',
        route: '/apps/contents',
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
        bgcolor: 'success',
        route: '/apps/logs',
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
        route: '/apps/bundles',
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
