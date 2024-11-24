import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureRoutes} from './features.routes';
import {RouterModule} from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from '../core/jwt.interceptor';


@NgModule({
    declarations: [],
    providers: [
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(FeatureRoutes)
    ]
})
export class FeaturesModule {
}
