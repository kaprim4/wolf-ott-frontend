import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutContainerComponent } from './layout/layout-container/layout-container.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { ComingSoonComponent } from './pages/extra-pages/coming-soon/coming-soon.component';
import { Error404Component } from './pages/extra-pages/error404/error404.component';
import { Error500Component } from './pages/extra-pages/error500/error500.component';
import { MaintenanceComponent } from './pages/extra-pages/maintenance/maintenance.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'apps',
        loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
      }
    ]
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
      {
        path: 'error-404',
        component: Error404Component
      },
      {
        path: 'error-500',
        component: Error500Component
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent
      },
      {
        path: 'coming-soon',
        component: ComingSoonComponent
      },
      { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
