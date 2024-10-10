import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppDialogComponent } from './dialog/dialog.component';
import { AppDividerComponent } from './divider/divider.component';
import { AppExpansionComponent } from './expansion/expansion.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppPaginatorComponent } from './paginator/paginator.component';
import { AppProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { AppProgressComponent } from './progress/progress.component';
import { AppRipplesComponent } from './ripples/ripples.component';
import { AppSlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { AppSliderComponent } from './slider/slider.component';
import { AppSnackbarComponent } from './snackbar/snackbar.component';
import { AppTabsComponent } from './tabs/tabs.component';
import { AppToolbarComponent } from './toolbar/toolbar.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
        data: {
          title: 'Badge',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Badge' },
          ],
        },
      },
      {
        path: 'expansion',
        component: AppExpansionComponent,
        data: {
          title: 'Expansion Panel',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Expansion Panel' },
          ],
        },
      },
      {
        path: 'chips',
        component: AppChipsComponent,
        data: {
          title: 'Chip',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Chip' },
          ],
        },
      },
      {
        path: 'dialog',
        component: AppDialogComponent,
        data: {
          title: 'Dialog',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Dialog' },
          ],
        },
      },
      {
        path: 'lists',
        component: AppListsComponent,
        data: {
          title: 'Lists',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Lists' },
          ],
        },
      },
      {
        path: 'divider',
        component: AppDividerComponent,
        data: {
          title: 'Divider',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Divider' },
          ],
        },
      },
      {
        path: 'menu',
        component: AppMenuComponent,
        data: {
          title: 'Menu',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Menu' },
          ],
        },
      },
      {
        path: 'paginator',
        component: AppPaginatorComponent,
        data: {
          title: 'Paginator',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Paginator' },
          ],
        },
      },
      {
        path: 'progress',
        component: AppProgressComponent,
        data: {
          title: 'Progress',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Progress' },
          ],
        },
      },
      {
        path: 'progress-spinner',
        component: AppProgressSnipperComponent,
        data: {
          title: 'Progress Spinner',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Progress Spinner' },
          ],
        },
      },
      {
        path: 'ripples',
        component: AppRipplesComponent,
        data: {
          title: 'Ripples',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Ripples' },
          ],
        },
      },
      {
        path: 'slide-toggle',
        component: AppSlideToggleComponent,
        data: {
          title: 'Slide Toggle',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Slide Toggle' },
          ],
        },
      },
      {
        path: 'slider',
        component: AppSliderComponent,
        data: {
          title: 'Slider',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Slider' },
          ],
        },
      },
      {
        path: 'snackbar',
        component: AppSnackbarComponent,
        data: {
          title: 'Snackbar',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Snackbar' },
          ],
        },
      },
      {
        path: 'tabs',
        component: AppTabsComponent,
        data: {
          title: 'Tabs',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Tabs' },
          ],
        },
      },
      {
        path: 'toolbar',
        component: AppToolbarComponent,
        data: {
          title: 'Toolbar',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Toolbar' },
          ],
        },
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
        data: {
          title: 'Tooltips',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Tooltips' },
          ],
        },
      },
    ],
  },
];
