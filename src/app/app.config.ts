import {
    ApplicationConfig,
    provideZoneChangeDetection,
    importProvidersFrom,
    LOCALE_ID
} from '@angular/core';
import {
    HttpClient,
    provideHttpClient,
    withInterceptors,
    withInterceptorsFromDi,
} from '@angular/common/http';
import {routes} from './app.routes';
import {
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideClientHydration} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// icons
import {TablerIconsModule} from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// perfect scrollbar
import {NgScrollbarModule} from 'ngx-scrollbar';
import {NgxPermissionsModule} from 'ngx-permissions';

//Import all material modules
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';

export function HttpLoaderFactory(http: HttpClient): any {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import {NgxEchartsModule} from 'ngx-echarts';
import {FormatAmountPipe} from "./helpers/format-amount.pipe";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import { JwtInterceptor } from './dashboard/core/jwt.interceptor';

registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(
            routes,
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
            }),
            withComponentInputBinding(),
        ),
        provideHttpClient(withInterceptors([JwtInterceptor])),
        // provideHttpClient(withInterceptorsFromDi()),
        provideClientHydration(),
        provideAnimationsAsync(),
        importProvidersFrom(
            FormsModule,
            ReactiveFormsModule,
            MaterialModule,
            NgxPermissionsModule.forRoot(),
            TablerIconsModule.pick(TablerIcons),
            NgScrollbarModule,
            CalendarModule.forRoot({
                provide: DateAdapter,
                useFactory: adapterFactory,
            }),
            NgxEchartsModule.forRoot({
                echarts: () => import('echarts'),
            }),
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            }),
            BrowserAnimationsModule,
            ToastrModule.forRoot()
        ),
    ],
};
